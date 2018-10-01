<template>
<div class='modal-mask' v-if='viewupload' transition='modal'>
  <div class='modal-container'>
    <div class='modal-header'>
      <div class='modal-close' @click='hideUploading ()'>Close</div>
    </div>
    <div class='modal-body transaction'>
      <form enctype='multipart/form-data' novalidate v-if='isInitial || isSaving'>
        <h1>Upload images</h1>
        <div class='dropbox'>
          <input type='file' :name='uploadFieldName' :disabled='isSaving' @change='filesChange ($event.target.name, $event.target.files); fileCount = $event.target.files.length' accept='image/*' class='input-file'>
          <p v-if='isInitial'>
            Drag your file (s) here to begin<br> or click to browse
          </p>
          <p v-if='isSaving'>
            Uploading your thumbnail...
          </p>
        </div>
      </form>

      <!--FAILED-->
      <div v-if='isFailed'>
        <h2>Uploaded failed.</h2>
        <p>
          <a href='javascript:void (0)' @click='reset ()'>Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
    <div class='modal-footer'>
      <button class='rd-small-button feed_close' @click='hideUploading ()'>Ok</button>
    </div>
  </div>
</div>

<div v-else-if='admin'>
  <md-card class='md-primary'>
    <md-card-header>
      <md-card-header-text style="width: 500px;">
          <md-input-container>
            <label>Name</label>
            <md-input class="md-title" v-model="summary.name"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Heandline</label>
            <md-input class='md-subhead' v-model="summary.headline"></md-input>
          </md-input-container>
      </md-card-header-text>

      <md-card-media style="width: 120px;height: 120px;">
        <div  class='img-thumbnail' :style='thumburl'>
        </div>
      </md-card-media>
    </md-card-header>

    <md-card-actions>
      <md-button @click='onUpload'>Upload Photo</md-button>
    </md-card-actions>
  </md-card>
  <md-button class='md-raised md-accent' @click.native='onSave'>
      <md-icon>save</md-icon>
      Save Changes
    </md-button>
</div>

<div v-else-if='!admin'>
  <md-card>
  <md-card-header>
    <md-card-header-text>
      <div class='md-title'>{{summary.name}}</div>
      <div class='md-subhead'>{{summary.headline}}</div>
    </md-card-header-text>

    <md-card-media style="width: 120px;height: 120px;">
      <div  class='img-thumbnail' :style='thumburl'>
      </div>
    </md-card-media>
  </md-card-header>
  </md-card>
</div>
</template>

<script>
import Config from '../../config.js'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  data () {
    return {
      viewupload: false,
      thumburl: 'background:url(https://s3-us-west-2.amazonaws.com/introduce-ling-thumb/UID.jpg);width: 120px;height: 120px;',
      selectedFile: null,
      validFileExtensions: ['image/jpg', 'image/jpeg', 'image/bmp', 'image/gif', 'image/png'],
      uploadfile: {},
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos'
    }
  },
  mounted () {
    this.reset()
    this.thumburl = this.thumburl.replace('UID', this.$route.params.uid)
  },

  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadfile = {}
      this.uploadError = null
    },
    onUpload () {
      this.viewupload = true
    },
    wait (ms) {
      return (x) => {
        return new Promise(resolve => setTimeout(() => resolve(x), ms))
      }
    },
    save (data) {
      this.currentStatus = STATUS_SAVING
      this.getImage(data)
        .then(x => {
          location.reload()
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList) {
      if (!fileList.length) return
      this.save(fileList[0])
    },
    hideUploading () {
      this.viewupload = false
    },
    onFileChanged (event) {
      this.selectedFile = event.target.files[0]
      var fileType = this.selectedFile.type
      if (this.selectedFile.size > 0) {
        var blnValid = this.validFileExtensions.indexOf(fileType) >= 0
        if (!blnValid) {
          alert('Sorry, ' + this.selectedFile.name + ' is invalid, allowed extensions are: ' + this.validFileExtensions.join(', '))
        }
      }
    },
    getImage (file) {
      return new Promise((resolve, reject) => {
        const fReader = new FileReader()
        fReader.onload = () => {
          console.log(fReader.result.substring(fReader.result.indexOf(',') + 1))
          var opts = {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
            body: fReader.result.substring(fReader.result.indexOf(',') + 1)
          }
          var url = Config.BASE_URL + '/thumb?userid=' + this.$route.params.uid
          fetch(url, opts).then(response => {
            return response.json()
          }).then(data => {
            console.log(data)

            resolve(data)
          }).catch(err => {
            console.error(err)
            reject(err)
          })
        }

        fReader.readAsDataURL(file)
      })
    },
    onSave () {
      var payload = {
        'id': this.$route.params.uid,
        'summary': this.summary,
        'headline': this.headline,
        'experiences': this.experiences,
        'education': this.education,
        'certificates': this.certificates,
        'skills': this.skills
      }
      var body = JSON.stringify(payload)
      var opts = {
        method: 'POST',
        body: body,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }
      var url = Config.BASE_URL + '/userdata'

      fetch(url, opts).then(response => {
        var data = response.json()
        console.log(data)
        return data
      }, function (err) {
        console.error(err)
      })
    }
  },

  props: ['education', 'skills', 'experiences', 'certificates', 'academic', 'summary', 'admin']
}
</script>

<style lang="scss">
.dropbox {
    outline: 2px dashed grey;
    /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px;
    min-height: 200px;
    /* minimum height */
    position: relative;
    cursor: pointer;
}

.input-file {
    opacity: 0;
    /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
}
.dropbox:hover {
    background: lightblue;
    /* when mouse over to the drop zone, change color */
}

.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
}

.img-thumbnail {
    display: inline-block;
    width: 100%;
    height: 100%;
}
// .md-card .md-card-header .md-card-media {
//     width: 120px;
//     flex: 0 0 120px;
//     height: 120px;
// }
// .md-card-header-text {
//   width: 500px;
// }
</style>
