document.addEventListener('DOMContentLoaded', () => {
    // DOMContentLoaded: HTMLが完全に読み込まれて解析された後に実行されるイベントリスナー

    // 主要な要素の取得
    const learnMoreBtn = document.getElementById('learnMoreBtn'); // 「もっと詳しく」ボタン
    const loadingScreen = document.getElementById('loading-screen'); // ローディング画面要素
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-bottom, .slide-in-right'); // アニメーション対象要素

    // --- 1. ローディング画面の処理 ---
    const showWebsite = () => {
        // ローディング画面にフェードアウトクラスを追加
        loadingScreen.classList.add('fade-out');

        // transitionendイベントでアニメーション終了後に要素を完全に非表示にする
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.style.display = 'none'; // 完全に非表示にする
            document.body.style.overflowY = 'auto'; // 本体のスクロールを許可する
        }, { once: true }); // イベントリスナーを一度だけ実行する

        // ページコンテンツの初期アニメーションをトリガー
        activateAnimationsOnScroll();
    };

    // ページ読み込み時に一時的にスクロールを禁止し、ローディング画面表示後に解除
    document.body.style.overflowY = 'hidden';
    // 3秒後にウェブサイトを表示する (ローディング画面をフェードアウトさせる)
    setTimeout(showWebsite, 3000);


    // --- 2. 「もっと詳しく」ボタンの処理 ---
    // もしlearnMoreBtnが存在すれば（ホームページの場合のみ）
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault(); // デフォルトの動作（ページ内スクロール）をキャンセル
            window.location.href = 'about.html'; // about.htmlに遷移
        });
    }


    // --- 3. ナビゲーションリンクのスムーズスクロール処理 ---
    // 全てのナビゲーションリンクに対してイベントリスナーを設定
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href'); // リンクのhref属性を取得

            // もしリンクが '#' で始まる場合（ページ内リンク）
            if (targetId.startsWith('#')) {
                e.preventDefault(); // デフォルトの動作（ページジャンプ）をキャンセル
                // 指定されたIDの要素までスムーズにスクロール
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // それ以外（別ページへのリンク例: index.html, about.htmlなど）は
            // ブラウザのデフォルト動作（ページ遷移）に任せる
        });
    });


    // --- 4. スクロールアニメーションの処理 ---
    // 要素が画面内に表示されたときにactiveクラスを追加/削除する関数
    const checkVisibility = () => {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect(); // 要素の表示領域情報を取得
            // 要素がビューポートの80%以上表示されているか、かつビューポート内に収まっているかを確認
            const isVisible = (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );

            if (isVisible) {
                element.classList.add('active'); // activeクラスを追加してアニメーションをトリガー
            } else {
                // 画面外に出たらactiveクラスを削除する（要素が再表示されたときにアニメーションを繰り返したい場合）
                // 現在のプロジェクトでは、一度アニメーションしたらそのままなので、この行はコメントアウトしています。
                // element.classList.remove('active');
            }
        });
    };

    // スクロールとリサイズイベントにアニメーションチェック関数を紐づける
    const activateAnimationsOnScroll = () => {
        checkVisibility(); // 初回ロード時にもチェック
        window.addEventListener('scroll', checkVisibility); // スクロール時にチェック
        window.addEventListener('resize', checkVisibility); // ウィンドウサイズ変更時にチェック
    };
});
