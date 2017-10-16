  // import BScroll from 'better-scrol'
  var vm = new Vue({
    el: '#idAuth',
    data () {
      return{
        status: 0,
        info: {
          name: '张三',
          sex: '男',
          ethnic: '汉',
          birth: '',
          site: '',
          id: ''
        },
        imgUrl: [],
        uploadFlag: false,
        whichUpload: Number,
        cssStyle: ['front', 'back', 'all']

      }
    },
    created () {

    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      prevent(event) {
        if (!event._constructed) {
          return
        }
      },
      _initScroll () {
        this.idAuthScroll =new window.BScroll('.scrollHook',{
          startX: 0,
          click: true,
        })
      },
      cancleUpload (event) {
        this.prevent(event)
        this.uploadFlag = false
      },
      upload (which) {
        if (this.status === 1) {
          return;
        } else if (this.status === 0) {
          this.uploadFlag = true
          this.whichUpload = which
        }
      },
      change (obj,which) {
        let whichUpload = parseInt(which)
        console.log(whichUpload)
        if (whichUpload === 0) {
          uploadImg = this.$refs.uploadItem1
        } else if (which ===1) {
          uploadImg = this.$refs.uploadItem2
        } else if (whichUpload ===2) {
          uploadImg = this.$refs.uploadItem3
        }
        console.log(uploadImg)
        let file = obj.files[0]
        console.log(file)
        // 接受 jpeg, jpg, png, gif 类型的图片
        // if (!/\/(?:jpeg|jpg|png|gif)/i.test(file.type)) return;
        // let reader = new FileReader();
        // reader.onload = function() {
        //   let result = obj.result;
        //   let img = new Image();
        //   img.onload = function() {
        //     let compressedDataUrl = compress(img);
        //     uploadImg.src = compressedDataUrl
        //     img = null;
        //   };
        //   img.src = result;
        // };
        // reader.readAsDataURL(file);
      },
      compress (img) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        const MAX_HEIGHT = 200;
        // 宽度等比例缩放 *=
        if (img.height > img.width && img.height > MAX_HEIGHT) {
          img.width *= MAX_HEIGHT / img.height;
          img.height = MAX_HEIGHT;
        }else if(img.width > img.height && img.width > MAX_HEIGHT){
          img.height *= MAX_HEIGHT / img.width;
          img.width = MAX_HEIGHT;
        }else if(img.width == img.height && img.width > MAX_HEIGHT){
          img.width = MAX_HEIGHT;
          img.height = MAX_HEIGHT;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);

        let base64data = canvas.toDataURL();
        canvas = ctx = null;
        return base64data;
      }



    }
  })

