(function(){
    'use strict';
    
    (function(){
    var checkContent = 
      '<div id="regulationChecker">' + 
        '<div>' +
          '<select id="tagSelect">' +
            '<option>文字セットを選択して下さい。</option>' +
            '<option>パターン1（半角NG）</option>' +
            '<option>パターン2(全角NG)</option>' +
          '</select>' +
          '<br>' +
          '<div>' +
            '<ul>' +
              '<li class="tab tab_active" id="tab_char">1文字</li>' +
              '<li class="tab" id="tab_word">単語</li>' +
            '</ul>' +
            '<textarea type="text" id="textArea_char"></textarea>' +
            '<textarea class="display_none" type="text" id="textArea_word"></textarea>' +
            '<div>' +
          '<div class="btn_check" id="btn_check">check</div>' +
        '</div>' +
      '</div>';
    
    //モーダルのhtmlを追加する
    var divTag = document.createElement('div');
    divTag.innerHTML = checkContent;
    var tagHTML = document.getElementsByTagName('html').item(0);
    tagHTML.appendChild(divTag);
    
    //モーダルのhtmlに適応させるcss
    var insertCSS =
    '#regulationChecker{' +
      'display: flex;' +
      'justify-content: center;' +
      'align-items: baseline;' +
      'width: 100%;' +
      'height: 100%;' +
      'position: fixed;' +
      'top: 0%;' +
      'left: 0%;' +
      'background-color: rgba(128,128,128,0.7);' +
      'z-index: 9999;' +
    '}' +
    '#regulationChecker > div{' +
      'font-size: 16px;' +
      'padding: 20px;' +
      'width: 100%;' +
      'max-width: 470px;' +
      'border: none;' +
      'border-radius: 5px;' +
      'background-color: #82cbee;' +
      'box-shadow: 5px 5px 5px rgba(0,0,0,0.5);' +
      'box-sizing: border-box;' +
    '}' +
    '#tagSelect{' +
      'width: 100%;' +
      'margin-bottom: 40px;' +
      'padding: 1em;' +
      'border: none;' +
      'border-radius: 5px;' +
      'background-color:#fff;' +
      'outline: none;' +
      'cursor: pointer;' +
      '-webkit-appearance: pop-up-menu;' +
    '}' +
    '#regulationChecker .btn_check{' +
      'width: 100%;' +
      'color: #0090aa;' +
      'font-size: 16px;' +
      'font-weight: bold;' +
      'text-align: center;' +
      'border: 1px solid #0090aa;' +
      'border-radius: 5px;' +
      'padding: 20px;' +
      'cursor: pointer;' +
      'transition: .2s;' +
      'box-sizing: border-box;' +
    '}' +
    '#checkButton:hover{' +
      'color: #fff;' +
      'background-color:#0090aa;' +
    '}' +
    '#regulationChecker ul{' +
      'list-style-type: none;' +
      'width: 100%;' +
      'color: #333;' +
      'margin-bottom: 5px;' +
    '}' +
    '#regulationChecker li{' +
      'display: inline-block;' +
      'padding:5px 20px;' +
      'cursor: pointer;' +
      'border-bottom: none;' +
    '}' +
    '#regulationChecker textarea{' +
      'width: 100%;' +
      'max-width: 100%;' +
      'height: 200px;' +
      'color: #333;' +
      'padding: 1em;' +
      'margin-bottom: 20px;' +
      'border: none;' +
      'border-radius: 5px;' +
      'background-color:#fff;' +
      'outline: none;' +
      'box-sizing: border-box;' +
    '}' +
    '.tab{' +
      'display: none;' +
      'background-color:inherit;' +
      'border-radius: 5px;' +
    '}' +
    '.tab_active{' +
      'display: inline-block;' +
      'background-color: #fff;' +
      'border-radius: 5px;' +
    '}' +
    '.display_none{' +
      'display: none;' +
    '}' +
    '.violation_word{' +
      'background:none !important;' +
      'color:black !important;' +
      'background-color:yellow !important;' +
      'display:inline !important;' +
      'padding:0 !important;' +
      'margin:0 !important;' +
      'float:none !important;' +
    '}';
      var tagStyle = document.createElement('style');
      tagStyle.innerHTML = insertCSS;
      document.getElementsByTagName('head')[0].appendChild(tagStyle);
    
    
    //全角の文字セット
    var emSizeSet = 'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヲンヴーＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９＜＞（）「」・‘’“”：／．％＆―！？';
    //半角の文字セット
    var halfSizeSet = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮｰｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟｳﾞ<>｢｣()･:\'.%&!?/"';
    
    
    //selectタグ内のoptionタグのvalueの値を入れる。
    var tagSelect = document.getElementById('tagSelect');
    var childTagSelect = tagSelect.childNodes;
    childTagSelect.item(1).value = halfSizeSet + '､｡';
    childTagSelect.item(2).value = emSizeSet  + '、。';
    
    //scriptタグに書かれている文字を消す。
    var tagScript = document.getElementsByTagName('script');
    for(var i = 0,len = tagScript.length-1;i <= len; i++){
        tagScript[i].textContent = '';
    }
    //noscriptタグに書かれている文字を消す。
    var tagNoscript = document.getElementsByTagName('noscript');
    for(var i = 0,len = tagNoscript.length-1;i <= len; i++){
        tagNoscript[i].textContent = '';
    }
    
    })();
    
    //レギュレーション違反の単語
    var arrayAllReg = [];
    arrayAllReg = [
      'javascript|Javascript|javaScript',
      'html|Html',
      'css|Css',
      'chorome',
      'internet explorer',
      'firefox|FireFox'
    ];
    //レギュレーション違反の単語を「|」で結合
    var allReg = arrayAllReg.join('|');
    
    //レギュレーションの配列をテキスト表示する。その際、改行をさせる
    var textAreaWord = document.getElementById('textArea_word');
    var textAreaWordText = '';
    for(var i = 0 ,len = arrayAllReg.length-1; i <= len;i++){
      textAreaWordText += arrayAllReg[i] + '\n';
    }
    textAreaWord.innerHTML = textAreaWordText;
    
    
    //文字一覧と単語一覧のリストをタブ切り替えする。
    var toggleTab = function(){
      tabChar.classList.toggle('tab_active');
      tabWord.classList.toggle('tab_active');
      textAreachar.classList.toggle('display_none');
      textAreaWord.classList.toggle('display_none');
    };
    var tabChar = document.getElementById('tab_char');
    var textAreachar = document.getElementById('textArea_char');
    tabChar.addEventListener('click',toggleTab,false);
    var tabWord = document.getElementById('tab_word');
    tabWord.addEventListener('click',toggleTab,false);
    
    
    //セレクトタグの選択により、textareaタグに書かれる文字を変更する
    var tagSelect = document.getElementById('tagSelect');
    var textAreaChar = document.getElementById('textArea_char');
    var selectChange = function(){
      textAreaChar.value = tagSelect.value;
    };
    tagSelect.addEventListener('change',selectChange,false);
    
    
    //ボタンがクリックされたら、変数regulationに文字列が格納される。
    var regulation;
    //textareaに入力された文字をもとにレギュレーションを決定した後、全テキストノードを順番に処理していく
    var getAllTextNode =function(){
    //textarea_charに入力された文字を取得
    var userWord = document.getElementById('textArea_char').value;
    //textarea_wordに入力された文字を改行ごとに配列に格納
      allReg = textAreaWord.value.split(/\n/);
      //改行で配列に格納する都合上、最後に空白の配列ができるので、その空白を削除する。
      allReg.pop();
      //配列を「|」で結合し、文字列として変数に格納する
      var myReg = allReg.join('|');
      //レギュレーションの元となる文字列の有無によって動作を制御する。
      var logiope = '|';
      var startRegClass = '[';
      var endRegClass = ']';
      //文字も単語もカラの場合
      if(userWord === '' && myReg === ''){
        alert('レギュレーション違反の文字が生成されていません。');
        return;
      }
      //単語がカラの場合
      else if(userWord === ''){
        logiope = '';
        startRegClass = '';
        endRegClass = '';
      }
      //文字がカラの場合
      else if(myReg === ''){
        logiope = '';
      }
      //2つのtextareanに入力された文字を使って、正規表現オブジェクトを生成する。
      regulation = new RegExp(startRegClass + userWord + endRegClass + logiope + myReg,'g');
    
      //生成したdivを消す
      var regulationChecker = document.getElementById('regulationChecker');
      regulationChecker.style.display = 'none';
    
      //全てのノードを取得する
      function child_node(node){
        for(var i = 0,len = node.childNodes.length; i < len; i++){
    
          //取得したノードがテキストノードだったら処理を行う
          if(node.childNodes[i].nodeType === 3){
            var checkText = node.childNodes[i].textContent;
    
            //チェックされるテキストが空白以外文字にひっかかったら処理を続行（＝空白のみの文字はチェック対象外）
            if(checkText.search(/\S/) !== -1){
              //関数doCheckに処理を投げて、戻り値を取得する。
              var returnText = doCheck(checkText);
              //関数doCheckの戻り値があった場合、処理を行う。
              if(returnText){
                 //innerHTMLを使うと、再起処理が機能しなくなるので、プレーンテキストを使用すること
                 node.childNodes[i].textContent = returnText;
              }
            }
          }
          child_node(node.childNodes[i]);//再帰処理。
        }
      }
    
      child_node(document.body);
      resultHTML();
    };
    
    var btnCheck = document.getElementById('btn_check');
    btnCheck.addEventListener('click',getAllTextNode,false);
    
    //アラート制御用のフラグ
    var flgVaiolation = false;
    //全てのテキストノードをチェックする。チェック対象はパラメータに格納された文字列
    function doCheck(checkText){
      //テキストノードがレギュレーションにマッチしたら配列を返す。
      var checkResultArray = checkText.match(regulation);
    
      //配列に値があったら（レギュレーション違反の文字が見つかったら）処理を続行
      if(checkResultArray){
        for(var i = 0,len = checkResultArray.length;i < len; i++){
           var escape = '';
           //レギュレーション違反の文字が正規表現の特殊文字だった場合、文字の前に\\を記述してエスケープする
          switch(checkResultArray[i]){
            case '(':
            case ')':
            case '.':
            case '?':
              escape = '\\';
            break;
            //スラッシュがそのままだとspanの閉じタグのスラッシュがひっかかるので、正規表現を使って「後ろにspanの文字がこないスラッシュ」に書き換える
            case '/':
              checkResultArray[i] = /\/[^span]/;
          }
          //replace(レギュレーション違反の文字をspanタグでくくる)するために、正規表現インスタンスを生成
          var regCheckResultArray = new RegExp(escape + checkResultArray[i],'g');
          checkText = checkText.replace(regCheckResultArray,'<span class="violation_word">' + checkResultArray[i] + '</span>');
        }
        flgVaiolation = true;
        return checkText;
      }
    }
    
    //生成されたソースコードはプレーンテキストなので、html形式に書き換える。
    var resultHTML = function(){
      var tagHTML = document.getElementsByTagName('html').item(0);
      var getSrc = tagHTML.innerHTML;
      //spanの開始タグを書き換える
      var repStartTag = getSrc.replace(/&lt;span class="violation_word"&gt;/g,'<span class="violation_word">');
      //spanの閉じタグを書き換える
      var repEndTag = repStartTag.replace(/&lt;\/span&gt;/g,'</span>');
      tagHTML.innerHTML = repEndTag;
      if(flgVaiolation){
        alert('レギュレーション違反の可能性がある文字が見つかりました。');
      }
      //alt・title・metaタグを調べる処理を走らせる
      checkATM();
    };
    
    //ATMの処理が全て終わった後、レギュレーション違反の文字を列挙するための文字列
    var resultAlert = '';
    //imgのalt・title・metaタグのレギュレーション違反の文字をアラートで表示する
    var doCheckATM = function (checkText){
      var checkResultArray =checkText.match(regulation);
      //レギュレーション違反の文字があった場合処理を続行
      if(checkResultArray){
        for(var i = 0,len = checkResultArray.length;i < len; i++){
          resultAlert += checkResultArray[i] + '\n';
        }
      }
    };
    
    //imgのalt・title・metaタグのレギュレーション違反の文字がないか調べる
    var checkATM = function(){
    //imgのaltのレギュレーションチェック
    var tagImg =document.getElementsByTagName('img');
    for(var i = 0,len = tagImg.length-1;i < len;i++){
      var altCheck = tagImg.item(i).alt;
      doCheckATM(altCheck);
    }
    
    //titleのレギュレーションチェック
    var tagTitle = document.title;
    doCheckATM(tagTitle);
    
    //metaタグのレギュレーションチェック
    var arrayTagMeta = document.getElementsByTagName('meta');
    for(var i3 =0,len3 = (arrayTagMeta.length -1);i3 <= len3;i3++){
      var metaName = arrayTagMeta[i3].getAttribute('name');
      var metaProperty = arrayTagMeta[i3].getAttribute('property');
      var metaEquiv = arrayTagMeta[i3].getAttribute('http-equiv');
      switch(metaName){
        case 'viewport':
        case 'format-detection':
        case 'robots':
          break;
        default:
        switch(metaProperty){
          case 'og:image':
          case 'og:url':
            break;
          default :
          if(metaEquiv === null){
            doCheckATM(arrayTagMeta[i3].content);
          }
        }
      }
      }
      //resultAlertがカラじゃなかったらアラートを投げる
      if(resultAlert !== ''){
        alert('alt・title・metaタグの中に、レギュレーション違反の可能性がある以下の文字が見つかりました。(consoleにも結果が生成されています)'+ '\n' + resultAlert);
        console.log(resultAlert);
      }
    };//checkAtm
    })();