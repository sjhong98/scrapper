<img width="1096" alt="스크린샷 2023-10-19 오후 2 33 16" src="https://github.com/sjhong98/scrapper/assets/90092013/d911b7db-8c47-4128-bd7f-b1fbdcbf51b4">

## 목차
1. [프로젝트 개요](#프로젝트개요)<br/>
2. [아이디어 소개](#아이디어소개)<br/>
3. [기능 소개](#기능소개)<br/>
4. [기술 스택](#기술스택)<br/>
5. [주요 기능 시연](#주요기능)<br/>
1). [회원가입 및 로그인](#회원가입및로그인)<br/>
2). [포스트 업로드](#포스트업로드)<br/>
3). [메인 페이지 및 개인 페이지](#개인페이지)<br/>
4). [드래그 방식 좋아요 기능](#드래그방식좋아요기능)<br/>
5). [스크랩 기능](#스크랩기능)<br/>

<br/>

<a name='프로젝트개요' />

## 1. 프로젝트 개요

Scrapper는 **텍스트 기반 SNS 서비스**입니다. 

<br/>

사용자는 Scrapper를 통해 가볍게 자신의 생각을 표현할 수 있고, <br/>
다른 사용자의 글의 원하는 구간을 선택하여 좋아요를 남길 수 있습니다.

<br/>

<a name='아이디어소개' />

## 2. 아이디어 소개

메인 아이디어는 '인스타그램 스토리의 텍스트 버전'이었습니다.

<br/>

인스타를 하다 보면 **게시물**을 전혀 올리지 않는 사람들도 **스토리**는 자주 올리는 것을 종종 보게 됩니다. <br/>**왜 사람들은 게시물보다 스토리를 더 활발하게 이용할까요?**

​<br/>

인스타 스토리의 특징은 업로드의 **부담감**을 최대한 낮추었다는 데에 있습니다. 게시물은 업로드를 위해 원하는 순서대로 크기에 맞추어 여러 장의 사진을 업로드하고 보정도 해야 하지만, 스토리는 한 장의 사진만을 원하는 구성으로 **자유롭게** 업로드하면 됩니다. 그마저도 24시간이 지나면 사라지기 때문에 전혀 부담이 없게 되죠. 

<br/>

이러한 스토리의 '가벼움'은 사용자들이 스토리를 활발하게 이용하도록 만드는 이유일 것 입니다.

​<br/>

이러한 아이디어를 바탕으로, 본 프로젝트는 **가볍게** 글을 쓸 수 있고, 이를 다른 사람과 **공유**하고, 글에 대한 **상호작용**을 이루고자 구상되었습니다. 

<br/>

<a name='기능소개' />

## 3. 기능 소개

이를 위해 Scrapper를 다음과 같은 기능으로 구성하였습니다.

1. 텍스트 기반 포스트 업로드
2. 텍스트 드래그 방식 좋아요 표시
3. 색으로 좋아요 양 표현
4. 포스트 스크랩

<br/>

<a name='기술스택' />

## 4. 기술 스택

이번 프로젝트는 개인 프로젝트로, 프론트엔드 / DB구축 / 배포까지 진행하였습니다.

<br />

### Configuration
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### FrontEnd
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescrip&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white"> <img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwind&logoColor=white">

### DB
<img src="https://img.shields.io/badge/firestore-FFCA28?style=for-the-badge&logo=firestore&logoColor=white">

### Deploy
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

<br/>

<a name='주요 기능 시연' />

## 4. 주요 기능 시연

<a name='회원가입및로그인' />

### 1) 회원가입 및 로그인
<br/>

![회원가입](https://github.com/sjhong98/scrapper/assets/90092013/09c3a89c-a9ae-4836-80da-d272ed000cfa)

Scrapper는 ID와 PW를 통해 회원가입할 수 있습니다. 회원가입을 마치면 해당 계정으로 로그인되며, 안내 게시물이 보이게 됩니다. (안내 게시물은 개인에게만 보입니다)

<br/>
<br/>
<br/>

<a name='포스트업로드' />

### 2) 포스트 업로드
<br/>

![업로드](https://github.com/sjhong98/scrapper/assets/90092013/5e30a449-d0e7-472b-bbac-d10dc38bfec1)

나의 개인 페이지에서 텍스트를 입력한 뒤, 로고를 클릭하여 업로드할 수 있습니다.

<br/>

텍스트 입력필드는 원래 contentEditable로 구현하려 했으나, 한글 입력 시 중복 입력되는 문제가 발생했습니다. 이에 필드 내에서 줄바꿈이 가능하고 비교적 자유롭게 조절이 가능한 textarea를 사용하여 구현하였습니다.

<br/>

![삭제](https://github.com/sjhong98/scrapper/assets/90092013/b23afb37-5121-4a37-8eae-98f5bbff3f82)

이렇게 업로드 된 포스트는, 포스트에 마우스오버 시 나타나는 우측 옵션을 통해 삭제할 수 있습니다.

<br/>
<br/>
<br/>

<a name='개인페이지' />

### 3) 메인 페이지 및 개인 페이지 
<br/>

![프로필이동](https://github.com/sjhong98/scrapper/assets/90092013/31a9e154-b26d-4f1a-8ce8-f67760ce2a69)

우측 상단에 있는 메뉴바를 통해서 페이지 간 이동을 할 수 있습니다. 

<br/>

posts 페이지로 이동하면 전체 사용자들이 업로드한 포스트를 확인할 수 있으며, 바로 좋아요 표시를 할 수 있습니다.

포스트를 클릭하면 해당 사용자의 개인 페이지로 이동할 수 있습니다

<br/>

개인 페이지에서는 해당 사용자가 업로드한 포스트들을 확인할 수 있습니다.

또, 로고 대신 해당 사용자의 ID를 띄워 어떤 사용자의 개인 페이지인지 확인할 수 있도록 하였습니다.


<br/>
<br/>
<br/>

<a name='드래그방식좋아요기능' />

### 4) 드래그 방식 좋아요 기능
<br/>

![좋아요](https://github.com/sjhong98/scrapper/assets/90092013/491e9ec5-87af-4aab-9175-a47e7ac45f3c)


원하는 텍스트를 드래그하여 좋아요를 표시할 수 있고, 좋아요 정보는 각 글자별 배경 색상의 차등을 통해 표시하도록 하였습니다.

<br/>

텍스트 드래그 정보를 얻기 위하여 **selection Web API**를 사용하였습니다. 
또 글자별 배경 색상 적용을 위해 좋아요 정보를 각 문자 인덱스 별로 좋아요 개수의 배열로 만들었고, 이에 따라 각기 다른 배경 색상을 적용하여 구현하였습니다.

<br/>
<br/>
<br/>

<a  name='스크랩기능' />

### 5) 스크랩 기능
<br/>

![스크랩](https://github.com/sjhong98/scrapper/assets/90092013/6ddcd494-0cfd-463d-8902-cb754fb12ebf)

원하는 포스트는, 포스트에 마우스오버 시에 나타나는 옵션을 통하여 스크랩할 수 있습니다. 

<br/>

스크랩을 완료하면 알림이 뜨며, 이후 스크랩 페이지에 추가되어 있는 것을 확인할 수 있습니다.
























