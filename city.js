//지역 DATA
var region = {
  '광역행정구역':['서울특별시', '세종특별자치시', '인천광역시', '부산광역시', '광주광역시', '대구광역시', '울산광역시', '대전광역시', '제주특별자치도', '제주시', '서귀포시'],
  '경기도':['경기도', '가평군', '강화군', '고양시', '구리시', '김포시', '군포시', '과천시', '광명시', '광주시', '남양주시', '동두천시', '부천시', '성남시', '이천시', '여주시', '안성시', '안양시', '양주시', '의정부시', '의왕시', '용인시', '안산시', '양평군', '오산시', '파주시', '포천시', '평택시', '화성시', '하남시'],
  '충청남도':['충청남도', '태안군', '서산시', '당진시', '아산시', '천안시', '예산군', '홍성군', '청양군', '공주시', '보령시', '부여군', '서천군', '논산시', '계룡시', '금산군'],
  '충청북도':['충청북도', '제천시', '단양군', '충주시', '음성군', '괴산군', '진천군', '증평군', '청주시', '보은군', '옥천군', '영동군'],
  '전라남도':['전라남도', '영광군', '장성군', '담양군', '신안군', '무안군', '함평군', '나주시', '화순군', '목포시', '영암군', '강진군', '해남군', '진도군', '완도군', '장흥군', '보성군', '고흥군', '여수시', '순천시', '광양시', '구례군', '곡성군'],
  '전라북도':['전라북도', '군산시', '익산시', '완주군', '무주군', '김제시', '전주시', '진안군', '부안군', '정읍시', '임실군', '장수군', '고창군', '순창군', '남원시'],
  '경상남도':['경상남도', '거창군', '합천군', '산청군', '의령군', '함안군', '창녕군', '밀양시', '양산시', '김해시', '창원시', '진주시', '하동군', '사천시', '고성군', '남해군', '통영시', '거제시'],
  '경상북도':['경상북도', '울진군', '봉화군', '영주시', '영양군', '안동시', '예천군', '문경시', '상주시', '김천시', '구미시', '칠곡군', '성주군', '고령군', '군위군', '의성군', '청송군', '영덕군', '포항시', '영천시', '경산시', '청도군', '경주시'],
  '강원도':['강원도', '철원군', '화천군', '양구군', '인제군', '고성군', '속초시', '춘천시', '홍천군', '횡성군', '원주시', '강릉시', '평창군', '정선군', '영월군', '동해시', '삼척시', '태백시'],
  '공사':['LH한국토지주택공사', 'SH서울주택도시공사', '부산도시공사', '김포도시관리공사', '경기주택도시공사', '대전도시공사', '광주광역시도시공사', '대구도시공사', '대구도시철도공사', '성남도시개발공사', '인천도시공사',
          '하남도시공사', '한국농어촌공사', '한국도로공사', '화성도시공사','남양주도시공사', '한국철도공사', '국가철도공단', '부산항만공사', '새만금개발공사', '새만금개발청', '수원도시공사', '시흥도시공사'],
  '국토부':['국토교통부', '서울지방국토관리청', '부산지방국토관리청', '대전지방국토관리청', '원주지방국토관리청', '익산지방국토관리청', '해양수산부'],
  '기타':['클린아이', 'ALIO', '주택도시보증공사', '한국부동산원', '제주국제자유도시개발센터', '화성산업단지관리사업소', '인천국제공항공사', '한국공항공사'],
}
var selected = undefined;

//concerns.json parsing
var citylist = {}
fetch('./cities.json').then(function(response){
  response.text().then(function(text){
    citylist = JSON.parse(text);
  })
});

//지역구분 타이틀
function division(){
  let list='';
  for(let key in region){
    list += `<li class="scroll-to-section"><a href="#our-classes" onclick="sidelist('${key}')">${key}</a></li>` ;
  }
  document.getElementById("nav").innerHTML = list;
}

//지역별 도시구분
function sidelist(self){
  // let target = self.value;
  let target = self;
  let list='';
  for(let i=0; i<region[target].length; i++){
    list += `<li><a onclick="publicPath(this)" id=${region[target][i]}><img src='images/${region[target][i]}.png'> ${region[target][i]}</a></li>`
  }
  document.getElementById("sidebarTitle").innerHTML = `<span>${target} (${region[target].length})</span><a href="#" data-toggle="tooltip" title="다열기" onclick="clickButton()"><i class="far fa-window-restore"></i></a>`;
  document.getElementById("sidebar").innerHTML = list;
}

function clickButton() {
  var list = document.getElementById('sidebar').getElementsByTagName("li");
  var from = 0;
  for (var i=0; i<list.length; i++) {
    var li = list.item(i);
    var a = li.firstElementChild;
    let target = a.id;
    let path = citylist[target];
    window.open(path, '_blank');
  }
}

function clickA(id) {
  var el = document.getElementById(id);
  el.click();
}

function publicPath(self){

  let target = self.id;
  let path = citylist[target];
  if (selected) {
      $(`#${selected}`).parent().removeClass("ui-tabs-active");
  }
  $(`#${self.id}`).parent().addClass("ui-tabs-active");
  selected = self.id;

  if (path.startsWith('http:')) {
    //http이면 옆창띄우기
    window.open(path, '_blank');

  } else {
    // https
    let pathsrc = '<iframe style="width:100%; height:700px; border:0;" title="공고/고시" src="'
    + path + '"></iframe>';
    document.getElementById("tabs-content").innerHTML = pathsrc;

    // console.log(path);
    // http-equiv의 속성값은 어떻게 가져오지?

  }
}
