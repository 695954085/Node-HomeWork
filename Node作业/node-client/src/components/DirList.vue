<template>
  <div>
    <div class='dirlist'>
      <div v-for="item in listItems" :key="item" class="item" @click="choosedDir(item)">
        <i class="el-icon-tickets"></i>
        <span>{{item}}</span>
      </div>
    </div>
    <div class="picList" v-if="showPicList">
      <div v-for="item in picListItems" :key='item' class="picItem">
        <img :src="'http://192.168.0.111:3000/static?fileDir=' + fileDir + '&fileName=' + item">
      </div>
    </div>
    <div v-else class="alert alert-danger">
      <span>请选择目录</span>
    </div>
    <div v-show="showLoading" class="showLoading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>
import { getListData, getPicData } from "@/api/getData";
export default {
  data() {
    return {
      listItems: [],
      showPicList: false,
      fileDir: "",
      showLoading: false,
      picListItems: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      this.listItems = await getListData({});
      // var initData = await getListData({});
      // this.listItems = initData.data;
    },
    readPic() {},
    async choosedDir(item) {
      this.picListItems = [];
      this.showLoading = true;
      this.fileDir = item;
      this.picListItems = await getPicData({ fileDir: item });
      // let picListObj = await getPicData({ fileDir: item });
      // this.picListItems = picListObj.data;
      this.showLoading = false;
      this.showPicList = true;
    }
  }
};
</script>
<style lang="scss">
.dirlist {
  width: 800px;
  overflow: hidden;
  margin: auto;
  .item {
    float: left;
    width: 100px;
    height: 100px;
    border: 1px solid #5e5e5e;
    margin: 10px 30px 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-direction: center;
    color: orange;
    cursor: pointer;

    &:hover {
      box-shadow: 5px 5px #5e5e5e;
    }

    .el-icon-tickets {
      margin-bottom: 10px;
      font-size: 40px;
    }

    .router-link {
      text-decoration: none;
      color: inherit;
    }
  }
}
.showLoading {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  color: orange;
  font-size: 50px;

  .el-icon-loading{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

.picList {
  width: 800px;
  margin: 30px auto;
  overflow: hidden;
  .picItem {
    float: left;
    width: 100px;
    height: 100px;
  }
}

.alert {
  margin: 30px auto;
  width: 800px;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 15px;
}

.alert-danger {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
</style>

