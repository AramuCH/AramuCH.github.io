document.addEventListener('DOMContentLoaded', () => {
    // DOMContentLoaded: HTMLドキュメントが完全に読み込まれ、解析された後にこの関数が実行されます。
    // これにより、JavaScriptがHTML要素にアクセスできるようになります。

    // --- 1. 主要なDOM要素の取得 ---
    const learnMoreBtn = document.getElementById('learnMoreBtn'); // 「もっと詳しく」ボタン
    const loadingScreen = document.getElementById('loading-screen'); // ウェブサイトのローディング画面要素
    // アニメーションの対象となる要素を全て選択します。
    // .fade-in-up, .slide-in-left, .slide-in-bottom, .slide-in-right などのクラスを持つ要素です。
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-bottom, .slide-in-right');


    // --- 2. ローディング画面の制御 ---
    // ウェブサイトのコンテンツを表示する関数
    const showWebsite = () => {
        // ローディング画面にCSSクラス 'fade-out' を追加し、フェードアウトアニメーションを開始します。
        loadingScreen.classList.add('fade-out');

        // setTimeout を使用して、ローディングアニメーションが完了するのを待ってから
        // ローディング画面を完全に非表示にし、ページのスクロールを許可します。
        // ここでの '1000'ms (1秒) は、CSSで設定された 'fade-out' トランジションの時間と合わせるか、
        // それより少し長めに設定することで、アニメーションが途中で切れるのを防ぎます。
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // ローディング画面をDOMから完全に非表示にします
            document.body.style.overflowY = 'auto'; // body要素の垂直スクロールを許可します
        }, 1000); // CSSのトランジション時間に合わせて調整してください (例: CSSが0.8秒なら800ms)

        // ページの初期コンテンツアニメーションをトリガーします。
        // ローディング画面が非表示になるタイミングで実行されるようにします。
        activateAnimationsOnScroll();
    };

    // ページが読み込まれた直後、一時的にbodyのスクロールを禁止します。
    // これにより、ローディング画面が表示されている間、ユーザーがコンテンツをスクロールするのを防ぎます。
    document.body.style.overflowY = 'hidden';
    // ★★★ ここを修正します ★★★
    // 5秒（5000ミリ秒）後にウェブサイトを表示する (ローディング画面をフェードアウトさせる)
    setTimeout(showWebsite, 5000);


    // --- 3. 「もっと詳しく」ボタンの機能 ---
    // learnMoreBtn が存在する場合のみ（主にindex.htmlにこのボタンがあるため）処理を実行します。
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault(); // クリックイベントのデフォルト動作（この場合はページ内ジャンプ）をキャンセルします。
            window.location.href = 'about.html'; // 'about.html' ページへリダイレクトします。
        });
    }


    // --- 4. ナビゲーションリンクのスムーズスクロールとページ遷移 ---
    // ヘッダー内の全てのナビゲーションリンク（`nav ul li a`）にイベントリスナーを設定します。
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href'); // クリックされたリンクの `href` 属性を取得します。

            // `href` が '#' で始まる場合（例: #about, #content）、それはページ内リンクと判断します。
            if (targetId.startsWith('#')) {
                e.preventDefault(); // デフォルトの動作（瞬間的なページジャンプ）をキャンセルします。
                // リンク先のIDを持つ要素までスムーズにスクロールします。
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth' // スムーズなスクロールアニメーションを有効にします。
                });
            }
            // `href` が '#' で始まらない場合（例: index.html, about.html）、
            // それは別ページへのリンクと判断し、ブラウザのデフォルトのページ遷移動作に任せます。
        });
    });


    // --- 5. スクロール時の要素アニメーション (フェードイン・スライドイン) ---
    // 画面内の要素の表示状態をチェックし、アニメーションをトリガーする関数です。
    const checkVisibility = () => {
        animatedElements.forEach(element => {
            // 各要素のビューポート内での位置とサイズ情報を取得します。
            const rect = element.getBoundingClientRect();
            // 要素がビューポートの約80%以上表示されているか、かつビューポート内に収まっているかを判断します。
            const isVisible = (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );

            if (isVisible) {
                // 要素が可視であれば 'active' クラスを追加し、CSSアニメーションを適用します。
                element.classList.add('active');
            }
            // else {
            //     // 要素が画面外に出たときに 'active' クラスを削除したい場合（アニメーションを繰り返す場合）は、
            //     // 上のコメントアウトを外してください。現在の設定では一度アニメーションしたらそのままです。
            //     // element.classList.remove('active');
            // }
        });
    };

    // スクロールアニメーションを有効にする関数です。
    const activateAnimationsOnScroll = () => {
        checkVisibility(); // ページがロードされた時点で一度、要素の可視性をチェックします。
        window.addEventListener('scroll', checkVisibility); // ユーザーがスクロールするたびに可視性をチェックします。
        window.addEventListener('resize', checkVisibility); // ウィンドウのサイズが変更されるたびに可視性をチェックします。
    };
});
