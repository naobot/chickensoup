var STORAGE_KEY = 'comic-vuejs'
var comicStorage = {
  fetch: function() {
    var lang = localStorage.getItem(STORAGE_KEY) || 'en'
    return lang
  },
  save: function(lang) {
    localStorage.setItem(STORAGE_KEY, lang)
  }
}
var translationsData = 
  {
    "en": {
      "chapNav": {
        "read": "Read:",
        "chapters": 
          [ "1", "2", "3", "4", "5", "6" ]
      },
      "siteNav": {
        "about": "About",
        "updates": "Updates",
        "switchLang": "中文"
      }
    },
    "zh": {
      "chapNav": {
        "read": "读：",
        "chapters": 
          [ "第1章", "第2章", "第3章", "第4章", "第5章", "第6章" ]
      },
      "siteNav": {
        "about": "关于",
        "updates": "消息",
        "switchLang": "English"
      }
    }
  };
var comicData;

// import Home from './templates/home.vue'
// import About from './templates/about.vue'

// const NotFound = { template: `<div class="container"><main><h2>Page not found</h2></main></div>` }
// const Chapter = { template: '<div>chapter {{ chap }}</div>' , props: ['chap']}
// const ChapterCover = { template: '<div>chapter cover</div>' }
// const Page = { template: '<div>page</div>' }

// const routes = [
//   { path: '/', component: Home },
//   { path: '/about', component: About },
//   { 
//     path: '/chapter/:chap', component: Chapter,
//     children: [
//       { path: '', component: Page, alias: 'page/0' },
//       { path: 'page/:pg', component: Page }
//     ],
//     props: true
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// $.ajax({
//   url: 'js/translations.json',
//   dataType: 'json',
//   async: false,
//   success: function(data) {
//     translationsData = data;
//   }
// })

var app = new Vue({
  // app initial state
  data: {
    currentRoute: window.location.pathname,
    comicPage: getHash(),
    lang: comicStorage.fetch(),
    fields: null
  },

  created: function() {
    this.loadBilingualFields();
  },

  // watch
  watch: {
    lang: {
      handler: function(lang) {
        comicStorage.save(lang);
      },
      deep: true
    },
    fields: {
      handler: function() {
        return
      },
      deep: true
    }
  },

  // methods
  methods: {
    toggleLang: function() {
      if (this.lang == 'en') {
        this.lang = 'zh';
        this.loadBilingualFields(translationsData['zh']);
      }
      else if (this.lang == 'zh') {
        this.lang = 'en';
        this.loadBilingualFields(translationsData['en']);
      }
      console.log('Changed language to ' + this.lang);
    },
    loadBilingualFields: function() {
      this.fields = translationsData[this.lang];
    }
  },

  // router

})

// routing
function getHash() {
  var comicPage = window.location.hash.replace(/#\/?/, '')
  if (!comicPage) {
    return 0
  }
  else {
    return comicPage
  }
}
function onHashChange() {
  app.comicPage = getHash()
}

app.$mount('.comic-app');