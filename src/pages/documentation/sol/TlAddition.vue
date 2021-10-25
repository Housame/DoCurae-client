<template>
    <div class="lt-addition-container">
        <div class="item-title">
            <!-- <div class="item-type"><p>{{tlAdditionItem.ltadditionsType}}</p></div> -->
            <div class="item-type"><p>{{tlAdditionItem.ltAdditionsType}}</p></div>
        </div> 
        <div>
            <div class="item-body">
                <p>{{tlAdditionItem.ltAdditionsText}}</p>
            </div> 
            <div class="item-footer">
                <p>{{tlAdditionItem.signer}} , {{date}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment"

export default {
    props:["tlAdditionItem"],
    

    computed:{
        date(){
            return moment(this.tlAdditionItem.signingsDate).format('LLLL');
        }
    }
}
</script>
<style lang="postcss" scoped>
.lt-addition-container{
    margin-left: 25px;

}
.item-body{
    background: #f2f2f2;
    margin: 0px 10px 0px 10px; 
    min-height:60px;  
    border-radius: 10px;
    padding: 10px 10px 0px 10px;
}
.item-type{
    text-align: left;
    display:inline-block;
    color: #fba368;
}
.item-reminder{
    text-align: right;
}
.item-title{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-dot-button {
    visibility: hidden;
    position: absolute;
    right: 20px;

    top: 50%;
    transform: translateY(-50%);
  }
    &:hover {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    color: #374b64;

    .item-dot-button {
      visibility: visible;
    }
  }
  &:not(:last-child) {

  }
}
.item-footer{
    padding-bottom: 0px;
    font-size: 12px;
    margin-top: -15px;
    margin-left: 10px;
    padding-bottom: 5px;
    font-style:italic;
    color: #c2c2d6;
}
</style>
