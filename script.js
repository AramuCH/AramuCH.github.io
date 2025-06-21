document.addEventListener('DOMContentLoaded', function() {
    const changeColorButton = document.getElementById('changeColorButton');
    const heroSection = document.querySelector('.hero');

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

        // 一度色が変更されたら、背景画像を再適用する（オプション：元の幾何学模様に戻す場合）
        // または、幾何学模様を保持したい場合はこの部分をコメントアウト
        // setTimeout(() => {
        //     heroSection.style.backgroundImage = `
        //         linear-gradient(45deg, #FFDAB9 25%, transparent 25%),
        //         linear-gradient(-45deg, #FFDAB9 25%, transparent 25%),
        //         linear-gradient(45deg, transparent 75%, #FFE4B5 75%),
        //         linear-gradient(-45deg, transparent 75%, #FFE4B5 75%)
        //     `;
        //     heroSection.style.backgroundSize = '30px 30px';
        //     heroSection.style.backgroundPosition = '0 0, 0 15px, 15px -15px, 15px 0px';
        // }, 1000); // 1秒後に幾何学模様を戻す例
    });
});
