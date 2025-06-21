document.addEventListener('DOMContentLoaded', function() {
    const changeColorButton = document.getElementById('changeColorButton');
    const heroSection = document.querySelector('.hero'); // index.html のヒーローセクション

    // changeColorButton と heroSection が存在する場合にのみ処理を実行
    if (changeColorButton && heroSection) {
        const pastelColors = [
            '#FFE4B5', // ミカドイエロー
            '#FFDAB9', // ピーチパフ
            '#FAFAD2', // ライトゴールデンロッドイエロー
            '#B0E0E6', // パウダーブルー
            '#DDA0DD'  // プラム
        ];

        let currentColorIndex = 0;

        changeColorButton.addEventListener('click', function() {
            // 背景画像を削除し、新しい背景色を適用する
            heroSection.style.backgroundImage = 'none';
            heroSection.style.backgroundColor = pastelColors[currentColorIndex];

            // 次の色のインデックスを更新
            currentColorIndex = (currentColorIndex + 1) % pastelColors.length;

            // オプション：元の幾何学模様に戻す場合
            // setTimeout(() => {
            //     heroSection.style.backgroundImage = `
            //         linear-gradient(45deg, #FFDAB9 25%, transparent 25%),
            //         linear-gradient(-45deg, #FFDAB9 25%, transparent 25%),
            //         linear-gradient(45deg, transparent 75%, #FFE4B5 75%),
            //         linear-gradient(-45deg, transparent 75%, #FFE4B5 75%)
            //     `;
            //     heroSection.style.backgroundSize = '30px 30px';
            //     heroSection.style.backgroundPosition = '0 0, 0 15px, 15px -15px, 15px 0px';
            // }, 1000);
        });
    }
});
