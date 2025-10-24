self.__BUILD_MANIFEST = {
  "/_error": [
    "./static/chunks/5c820ee3ba9c0cea.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [
      {
        "has": [
          {
            "type": "header",
            "key": "next-url",
            "value": "(?:\\/(.*))?[\\/#\\?]?"
          }
        ],
        "source": "/posts/:id",
        "destination": "/(.)posts/:id"
      }
    ],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()