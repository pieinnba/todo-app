<script setup>

</script>

<template>
  <router-view></router-view>
</template>

<style>
  *{
    padding: 0;
    margin: 0;
    border: 0;
  }
  *,*:before,*:after{
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  :focus,:active{outline: none;}
  a:focus,a:active{outline: none;}
  
  nav,footer,header,aside{display: block;}
  
  html,body{
    height: 100%;
    width: 100%;
    font-size: 100%;
    line-height: 1;
    font-size: 14px;
    font-family: 'Inconsolata', monospace;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  input,button,textarea{font-family:inherit;}
  
  input::-ms-clear{display: none;}
  button{cursor: pointer;}
  button::-moz-focus-inner {padding:0;border:0;}
  a, a:visited{text-decoration: none;}
  a:hover{text-decoration: none;}
  ul li{list-style: none;}
  img{vertical-align: top;}
  
  h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight: 400;}
  
  #title {
    margin: 1rem auto .5rem;
    position: relative;
    width: fit-content;
    height: fit-content;
    font-weight: 900;
    font-size: 2rem;
  }
  #app {
    padding: .5rem;
    max-width: 50rem;
    margin: 0 auto;
    background-color: rgb(248, 248, 248);
    border: .1rem rgb(140, 140, 140) solid;
    position: relative;
    min-height: 50%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  @media only screen and (max-width: 50rem) {
    #app {
      min-height: 93%;
      min-width: 100%;
      padding: 0;
    }
    #title {
      margin: 0 auto;
      height: 7%;
      display: flex;
      align-items: center;
    }
  }
</style>