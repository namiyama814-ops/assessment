'use strict';

const usernameInput    = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision   = document.getElementById('result-area');
const postDivision     = document.getElementById('post-area');
const caveat           = document.getElementById('caveat') 

assessmentButton.onclick = function() {
  const username = usernameInput.value;
  if (username.length === 0){
    caveat.innerText = '';
    const caveatgoogle = document.createElement('p');
    caveatgoogle.innerText = '名前を入力してください';
    caveat.appendChild(caveatgoogle);
    return; //名前がない場合処理を終了する
  }

//表示の前にdiv内を空にするコード

resultDivision.innerText = '';

//診断表示結果エリアの作成
caveat.innerText = '';
const header = document.createElement('h3'); //h3タグを作成
header.innerText = '診断結果'; //中身の文章を設定
resultDivision.appendChild(header);//divの子要素として追加

const paragraph = document.createElement('p');
const result = assessment(username);
paragraph.innerText = result; //結果の文章をpタグに入れるよう設定
resultDivision.appendChild(paragraph); //pタグに文章を入れる

//ポストエリアの作成
const anchor = document.createElement('a');
postDivision.innerText = '';
const hrefvalue = `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent('あなたのいいところ診断')}&ref_src=twsrc%5Etfw`;
anchor.setAttribute('href', hrefvalue);
anchor.setAttribute('class', 'twitter-hashtag-button');
anchor.setAttribute('data-Text', result);
anchor.innerText = 'ポスト #あなたのいいところ' ;
postDivision.appendChild(anchor);

const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
postDivision.appendChild(script);
}

const answers = [
  '###userName###さんのいいところは声です。###userName###さんの特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###さんのいいところはまなざしです。###userName###さんに見つめられた人は、気になって仕方がないでしょう。',
  '###userName###さんのいいところは情熱です。###userName###さんの情熱に周りの人は感化されます。',
  '###userName###さんのいいところは厳しさです。###userName###さんの厳しさがものごとをいつも成功に導きます。',
  '###userName###さんのいいところは知識です。博識な###userName###さんを多くの人が頼りにしています。',
  '###userName###さんのいいところはユニークさです。###userName###さんだけのその特徴が皆を楽しくさせます。',
  '###userName###さんのいいところは用心深さです。###userName###さんの洞察に、多くの人が助けられます。',
  '###userName###さんのいいところは見た目です。内側から溢れ出る###userName###さんの良さに皆が気を惹かれます。',
  '###userName###さんのいいところは決断力です。###userName###さんがする決断にいつも助けられる人がいます。',
  '###userName###さんのいいところは思いやりです。###userName###さんに気をかけてもらった多くの人が感謝しています。',
  '###userName###さんのいいところは感受性です。###userName###さんが感じたことに皆が共感し、わかりあうことができます。',
  '###userName###さんのいいところは節度です。強引すぎない###userName###さんの考えに皆が感謝しています。',
  '###userName###さんのいいところは好奇心です。新しいことに向かっていく###userName###さんの心構えが多くの人に魅力的に映ります。',
  '###userName###さんのいいところは気配りです。###userName###さんの配慮が多くの人を救っています。',
  '###userName###さんのいいところはその全てです。ありのままの###userName###さん自身がいいところなのです。',
  '###userName###さんのいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###さんが皆から評価されています。',
];

/**
 * 名前の文字列を入力すると診断結果を返す関数
 * @param {string} username ユーザー名
 * @return {string} 診断結果
 */
function assessment(username) {
  let sumOfcharcode = 0
  for (let i = 0; i < username.length; i++) {
    sumOfcharcode = sumOfcharcode + username.charCodeAt(i)
  }

  //　文字コード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfcharcode % answers.length;
  let result = answers[index]
  result = result.replaceAll('###userName###', username)
  //関数を実行
  return result;
}

usernameInput.onkeydown = event => {
  if (event.key === 'Enter')
    assessmentButton.onclick();
}