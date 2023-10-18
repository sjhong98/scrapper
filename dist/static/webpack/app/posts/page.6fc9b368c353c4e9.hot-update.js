"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/posts/page",{

/***/ "(app-pages-browser)/./app/posts/page.tsx":
/*!****************************!*\
  !*** ./app/posts/page.tsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Posts; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ \"(app-pages-browser)/./node_modules/firebase/app/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/main.css */ \"(app-pages-browser)/./app/styles/main.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n// 서버에 reverse된 순서로 저장했다가, 0~30 인덱스만 받아오기 -> 자동으로 갱신되는 것\n\n\n\n\n\nfunction Posts() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [postList, setPostList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [lineIndex, setLineIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(-1);\n    const [menuHomeOver, setMenuHomeOver] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [menuMyOver, setMenuMyOver] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedId, setSelectedId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [menuScrapOver, setMenuScrapOver] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const firebaseConfig = {\n        apiKey: \"AIzaSyB0wNhng69y2_dkHsPjN1k579LeYrSQWdU\",\n        authDomain: \"scrapper-9558b.firebaseapp.com\",\n        databaseURL: \"https://scrapper-9558b-default-rtdb.asia-southeast1.firebasedatabase.app\",\n        projectId: \"scrapper-9558b\",\n        storageBucket: \"scrapper-9558b.appspot.com\",\n        messagingSenderId: \"241265284136\",\n        appId: \"1:241265284136:web:253ec9f008e31a3d03911d\"\n    };\n    const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_3__.initializeApp)(firebaseConfig);\n    const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getFirestore)(app);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        getContentFromDb();\n    // eslint-disable-next-line\n    }, []);\n    const getContentFromDb = async ()=>{\n        let q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.collection)(db, \"posts\"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.orderBy)(\"time\", \"desc\"));\n        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getDocs)(q).then((res)=>{\n            let temp = [];\n            res.forEach((doc)=>{\n                let docTemp = doc.data();\n                docTemp.postId = doc.id;\n                temp.push(docTemp);\n            });\n            setPostList(temp);\n            console.log(temp);\n        });\n    };\n    const uploadLikes = (postId, newLikes)=>{\n        const documentRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.doc)(db, \"posts\", postId);\n        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.updateDoc)(documentRef, {\n            likes: newLikes\n        });\n        getContentFromDb();\n    };\n    const handleTextSelection = ()=>{\n        let startIndex;\n        let endIndex;\n        console.log(postList);\n        const findObj = postList.find((item)=>item.postId === selectedId);\n        const selection = window.getSelection();\n        if (selection && selection.rangeCount > 0) {\n            const range = selection.getRangeAt(0);\n            const selectedText = range.toString();\n            startIndex = findObj.msg.indexOf(selectedText);\n            endIndex = startIndex + selectedText.length - 1;\n        }\n        let testLineBreaks = \"\"; // 줄바꿈 문자만큼 하이라이트를 앞 당김\n        for(let i = 0; i < startIndex; i++){\n            testLineBreaks += findObj.msg[i];\n        }\n        let linebreaks = 0;\n        const matches = testLineBreaks.match(/\\\\n/g);\n        if (matches !== null) {\n            linebreaks = matches.length;\n        }\n        if (linebreaks > 0) {\n            startIndex -= linebreaks;\n            if (endIndex !== undefined) endIndex -= linebreaks;\n        }\n        let length;\n        if (endIndex !== undefined) length = endIndex - startIndex;\n        let count = startIndex;\n        if (length !== undefined) for(let i = 0; i < length + 1; i++){\n            findObj.likes = findObj.likes + count.toString() + \" \";\n            count++;\n        }\n        uploadLikes(selectedId, findObj.likes);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"h-auto min-h-screen w-screen bg-white flex flex-col justify-center items-center\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"h-1/6 w-1/2 flex justify-center items-center fixed top-0 z-40\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"tracking-[-5px] text-black text-8xl border-r-4 border-black pr-[15px] \",\n                    style: {\n                        fontFamily: \"lemon-r\"\n                    },\n                    children: \"SCRAPPER\"\n                }, void 0, false, {\n                    fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n                    lineNumber: 126,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n                lineNumber: 125,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-5/6 h-screen\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"h-1/5\"\n                    }, void 0, false, {\n                        fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n                        lineNumber: 134,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"h-auto flex flex-col justify-center items-center\",\n                        children: postList.map((item, index)=>{\n                            const unescapedMsg = item.msg.replace(/\\\\n/g, \"\\n\");\n                            // 좋아요 정보 시각화 로직\n                            let likesCount = [];\n                            let likes = item.likes.split(\" \");\n                            for(let i = 0; i < unescapedMsg.length; i++)likesCount[i] = 0;\n                            for(let i = 0; i < likes.length; i++)likesCount[likes[i]] = likesCount[likes[i]] + 1;\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"text-black text-center mt-12\",\n                                        children: item.user\n                                    }, index, false, {\n                                        fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n                                        lineNumber: 149,\n                                        columnNumber: 25\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        onMouseOver: ()=>{\n                                            setLineIndex(index);\n                                            setSelectedId(item.postId);\n                                        },\n                                        onMouseLeave: ()=>setLineIndex(-1),\n                                        onClick: ()=>router.push(\"/board/\".concat(item.user)),\n                                        style: {\n                                            whiteSpace: \"pre-wrap\"\n                                        },\n                                        className: index === lineIndex ? \"leading-[38px] text-black font-extralight p-3 mt-2 text-[20px] text-center rounded-md line-highlight\" : \"leading-[38px] text-black font-extralight text-[20px] p-3 mt-2 text-center rounded-md line-un-highlight\",\n                                        children: unescapedMsg.split(\"\").map((char, index)=>{\n                                            let changeColor;\n                                            if (likesCount[index] > 8) changeColor = \"#A6A6A6\";\n                                            else if (likesCount[index] >= 7) changeColor = \"#ADADAD\";\n                                            else if (likesCount[index] >= 6) changeColor = \"#B5B5B5\";\n                                            else if (likesCount[index] >= 5) changeColor = \"#BFBFBF\";\n                                            else if (likesCount[index] >= 4) changeColor = \"#CCCCCC\";\n                                            else if (likesCount[index] >= 3) changeColor = \"#D9D9D9\";\n                                            else if (likesCount[index] >= 2) changeColor = \"#E6E6E6\";\n                                            else if (likesCount[index] >= 1) changeColor = \"#F2F2F2\";\n                                            else changeColor = \"#FFF\";\n                                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                onMouseUp: handleTextSelection,\n                                                className: \"text-black\",\n                                                style: {\n                                                    backgroundColor: changeColor,\n                                                    userSelect: \"text\"\n                                                },\n                                                children: char\n                                            }, index, false, {\n                                                fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n                                                lineNumber: 171,\n                                                columnNumber: 29\n                                            }, this);\n                                        })\n                                    }, index, false, {\n                                        fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n                                        lineNumber: 150,\n                                        columnNumber: 25\n                                    }, this)\n                                ]\n                            }, index, true, {\n                                fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n                                lineNumber: 148,\n                                columnNumber: 25\n                            }, this);\n                        })\n                    }, void 0, false, {\n                        fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n                        lineNumber: 135,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n                lineNumber: 133,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/hongseungjae/Desktop/learning.js/scrapper/app/posts/page.tsx\",\n        lineNumber: 124,\n        columnNumber: 9\n    }, this);\n}\n_s(Posts, \"qk66Le1jcm6ZnNlpD8UuMr4hAvI=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Posts;\nvar _c;\n$RefreshReg$(_c, \"Posts\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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InNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvcG9zdHMvcGFnZS50c3g/Zjk5MSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuLy8g7ISc67KE7JeQIHJldmVyc2XrkJwg7Iic7ISc66GcIOyggOyepe2WiOuLpOqwgCwgMH4zMCDsnbjrjbHsiqTrp4wg67Cb7JWE7Jik6riwIC0+IOyekOuPmeycvOuhnCDqsLHsi6DrkJjripQg6rKDXG5cbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCB9IGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcbmltcG9ydCBIb21lSWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL0hvbWUnO1xuaW1wb3J0IERhc2hib2FyZEljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9EYXNoYm9hcmQnO1xuaW1wb3J0IFN0YXJJY29uIGZyb20gJ0BtdWkvaWNvbnMtbWF0ZXJpYWwvU3Rhcic7XG5pbXBvcnQgeyBcbiAgZ2V0RmlyZXN0b3JlLCBcbiAgY29sbGVjdGlvbixcbiAgb3JkZXJCeSxcbiAgLy8gYWRkRG9jLCAgIC8vIOyehOydmOydmCBJZCDsp4DsoJVcbiAgLy8gc2V0RG9jLCAgIC8vIElkIOyngOyglSDqsIDriqVcbiAgdXBkYXRlRG9jLCAgIC8vIHVwZGF0ZSBkb2N1bWVudFxuICBhcnJheVVuaW9uLCAgIC8vIHB1c2ggZWxlbSB0byBhcnJheVxuICBnZXREb2NzLCAgLy8g7KCE7LK0IOydveyWtOyYpOq4sFxuICBnZXREb2MsICAgLy8g66y47IScIO2VmOuCmCDsnb3slrTsmKTquLBcbiAgZGVsZXRlRG9jLCAvLyDsgq3soJxcbiAgZG9jLCAgICAgICAvLyDtirnsoJUg642w7J207YSwIOydveq4sFxuICBxdWVyeSxcbiB9IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcblxuaW1wb3J0ICcuLi9zdHlsZXMvbWFpbi5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQb3N0cygpIHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICBjb25zdCBbcG9zdExpc3QsIHNldFBvc3RMaXN0XSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbbGluZUluZGV4LCBzZXRMaW5lSW5kZXhdID0gdXNlU3RhdGUoLTEpO1xuICAgIGNvbnN0IFttZW51SG9tZU92ZXIsIHNldE1lbnVIb21lT3Zlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW21lbnVNeU92ZXIsIHNldE1lbnVNeU92ZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtzZWxlY3RlZElkLCBzZXRTZWxlY3RlZElkXSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIik7XG4gICAgY29uc3QgW21lbnVTY3JhcE92ZXIsIHNldE1lbnVTY3JhcE92ZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgY29uc3QgZmlyZWJhc2VDb25maWcgPSB7XG4gICAgICAgIGFwaUtleTogXCJBSXphU3lCMHdOaG5nNjl5Ml9ka0hzUGpOMWs1NzlMZVlyU1FXZFVcIixcbiAgICAgICAgYXV0aERvbWFpbjogXCJzY3JhcHBlci05NTU4Yi5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9zY3JhcHBlci05NTU4Yi1kZWZhdWx0LXJ0ZGIuYXNpYS1zb3V0aGVhc3QxLmZpcmViYXNlZGF0YWJhc2UuYXBwXCIsXG4gICAgICAgIHByb2plY3RJZDogXCJzY3JhcHBlci05NTU4YlwiLFxuICAgICAgICBzdG9yYWdlQnVja2V0OiBcInNjcmFwcGVyLTk1NThiLmFwcHNwb3QuY29tXCIsXG4gICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjI0MTI2NTI4NDEzNlwiLFxuICAgICAgICBhcHBJZDogXCIxOjI0MTI2NTI4NDEzNjp3ZWI6MjUzZWM5ZjAwOGUzMWEzZDAzOTExZFwiXG4gICAgfTtcbiAgICBjb25zdCBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcbiAgICBjb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xuICAgIFxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGdldENvbnRlbnRGcm9tRGIoKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgZ2V0Q29udGVudEZyb21EYiA9IGFzeW5jICgpID0+IHsgICBcbiAgICAgICAgbGV0IHEgPSBxdWVyeShjb2xsZWN0aW9uKGRiLCAncG9zdHMnKSwgb3JkZXJCeSgndGltZScsICdkZXNjJykpXG4gICAgICAgIGF3YWl0IGdldERvY3MocSlcbiAgICAgICAgLnRoZW4oKHJlczphbnkpID0+IHtcbiAgICAgICAgICBsZXQgdGVtcDphbnkgPSBbXTtcbiAgICAgICAgICByZXMuZm9yRWFjaCgoZG9jOmFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRvY1RlbXAgPSBkb2MuZGF0YSgpO1xuICAgICAgICAgICAgZG9jVGVtcC5wb3N0SWQgPSBkb2MuaWQ7XG4gICAgICAgICAgICB0ZW1wLnB1c2goZG9jVGVtcCk7XG4gICAgICAgICAgfSk7ICAgIFxuICAgICAgICAgIHNldFBvc3RMaXN0KHRlbXApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXApO1xuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgY29uc3QgdXBsb2FkTGlrZXM9IChwb3N0SWQ6c3RyaW5nLCBuZXdMaWtlczpzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRSZWYgPSBkb2MoZGIsICdwb3N0cycsIHBvc3RJZCk7XG4gICAgICAgIHVwZGF0ZURvYyhkb2N1bWVudFJlZiwge1xuICAgICAgICAgICAgbGlrZXM6IG5ld0xpa2VzXG4gICAgICAgIH0pO1xuICAgICAgICBnZXRDb250ZW50RnJvbURiKCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGhhbmRsZVRleHRTZWxlY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgIGxldCBzdGFydEluZGV4O1xuICAgICAgICBsZXQgZW5kSW5kZXg7XG4gICAgICAgIGNvbnNvbGUubG9nKHBvc3RMaXN0KTtcbiAgICAgICAgY29uc3QgZmluZE9iaiA9IHBvc3RMaXN0LmZpbmQoKGl0ZW06IGFueSkgPT4gKGl0ZW0gYXMgYW55KS5wb3N0SWQgPT09IHNlbGVjdGVkSWQpIGFzIGFueTtcbiAgICBcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIFxuICAgICAgICBpZiAoc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5yYW5nZUNvdW50ID4gMCkge1xuICAgICAgICAgIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gcmFuZ2UudG9TdHJpbmcoKTtcbiAgICAgICAgICBzdGFydEluZGV4ID0gZmluZE9iai5tc2cuaW5kZXhPZihzZWxlY3RlZFRleHQpO1xuICAgICAgICAgIGVuZEluZGV4ID0gc3RhcnRJbmRleCArIHNlbGVjdGVkVGV4dC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGxldCB0ZXN0TGluZUJyZWFrcyA9IFwiXCI7ICAgIC8vIOykhOuwlOq/iCDrrLjsnpDrp4ztgbwg7ZWY7J2065287J207Yq466W8IOyVniDri7nquYBcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8c3RhcnRJbmRleDsgaSsrKSB7XG4gICAgICAgICAgdGVzdExpbmVCcmVha3MgKz0gZmluZE9iai5tc2dbaV07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxpbmVicmVha3MgPSAwO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGVzdExpbmVCcmVha3MubWF0Y2goL1xcXFxuL2cpO1xuICAgICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICAgIGxpbmVicmVha3MgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZihsaW5lYnJlYWtzID4gMCkge1xuICAgICAgICAgIHN0YXJ0SW5kZXggLT0gbGluZWJyZWFrcztcbiAgICAgICAgICBpZihlbmRJbmRleCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgZW5kSW5kZXggLT0gbGluZWJyZWFrcztcbiAgICAgICAgfSBcbiAgICBcbiAgICAgICAgbGV0IGxlbmd0aFxuICAgICAgICBpZihlbmRJbmRleCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGxlbmd0aCA9IGVuZEluZGV4IC0gc3RhcnRJbmRleDtcbiAgICAgICAgbGV0IGNvdW50ID0gc3RhcnRJbmRleDtcbiAgICBcbiAgICAgICAgaWYobGVuZ3RoICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuZ3RoKzE7IGkrKykge1xuICAgICAgICAgICAgZmluZE9iai5saWtlcyA9IGZpbmRPYmoubGlrZXMgKyBjb3VudC50b1N0cmluZygpICsgXCIgXCI7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgdXBsb2FkTGlrZXMoc2VsZWN0ZWRJZCwgZmluZE9iai5saWtlcyk7XG4gICAgICB9O1xuICAgIFxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLWF1dG8gbWluLWgtc2NyZWVuIHctc2NyZWVuIGJnLXdoaXRlIGZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMS82IHctMS8yIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGZpeGVkIHRvcC0wIHotNDBcIj5cbiAgICAgICAgICAgICAgICA8cCBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJhY2tpbmctWy01cHhdIHRleHQtYmxhY2sgdGV4dC04eGwgYm9yZGVyLXItNCBib3JkZXItYmxhY2sgcHItWzE1cHhdIFwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7Zm9udEZhbWlseTonbGVtb24tcid9fT5cbiAgICAgICAgICAgICAgICAgICAgU0NSQVBQRVJcbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTUvNiBoLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC0xLzVcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC1hdXRvIGZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgeyBwb3N0TGlzdC5tYXAoKGl0ZW06YW55LCBpbmRleDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5lc2NhcGVkTXNnID0gaXRlbS5tc2cucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyDsoovslYTsmpQg7KCV67O0IOyLnOqwge2ZlCDroZzsp4FcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpa2VzQ291bnQ6YW55ID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaWtlcyA9IGl0ZW0ubGlrZXMuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTx1bmVzY2FwZWRNc2cubGVuZ3RoOyBpKyspICAvLyDstIjquLDtmZRcbiAgICAgICAgICAgICAgICAgICAgbGlrZXNDb3VudFtpXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxpa2VzLmxlbmd0aDsgaSsrKSAgLy8g65Oc656Y6re465CcIOu2gOu2hOydmCDsiKvsnpAg7Kad6rCAXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWtlc0NvdW50W2xpa2VzW2ldXSA9IGxpa2VzQ291bnRbbGlrZXNbaV1dICsgMTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGtleT17aW5kZXh9IGNsYXNzTmFtZT1cInRleHQtYmxhY2sgdGV4dC1jZW50ZXIgbXQtMTJcIj57aXRlbS51c2VyfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH0gXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17KCkgPT4ge3NldExpbmVJbmRleChpbmRleCk7IHNldFNlbGVjdGVkSWQoaXRlbS5wb3N0SWQpfX0gXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldExpbmVJbmRleCgtMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChgL2JvYXJkLyR7aXRlbS51c2VyfWApfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpbmRleCA9PT0gbGluZUluZGV4ID8gXCJsZWFkaW5nLVszOHB4XSB0ZXh0LWJsYWNrIGZvbnQtZXh0cmFsaWdodCBwLTMgbXQtMiB0ZXh0LVsyMHB4XSB0ZXh0LWNlbnRlciByb3VuZGVkLW1kIGxpbmUtaGlnaGxpZ2h0XCIgOiBcImxlYWRpbmctWzM4cHhdIHRleHQtYmxhY2sgZm9udC1leHRyYWxpZ2h0IHRleHQtWzIwcHhdIHAtMyBtdC0yIHRleHQtY2VudGVyIHJvdW5kZWQtbWQgbGluZS11bi1oaWdobGlnaHRcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdW5lc2NhcGVkTXNnLnNwbGl0KFwiXCIpLm1hcCgoY2hhcjpzdHJpbmcsIGluZGV4Om51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VDb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihsaWtlc0NvdW50W2luZGV4XSA+IDgpIGNoYW5nZUNvbG9yID0gJyNBNkE2QTYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYobGlrZXNDb3VudFtpbmRleF0gPj0gNykgY2hhbmdlQ29sb3IgPSAnI0FEQURBRCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihsaWtlc0NvdW50W2luZGV4XSA+PSA2KSBjaGFuZ2VDb2xvciA9ICcjQjVCNUI1JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGxpa2VzQ291bnRbaW5kZXhdID49IDUpIGNoYW5nZUNvbG9yID0gJyNCRkJGQkYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYobGlrZXNDb3VudFtpbmRleF0gPj0gNCkgY2hhbmdlQ29sb3IgPSAnI0NDQ0NDQyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihsaWtlc0NvdW50W2luZGV4XSA+PSAzKSBjaGFuZ2VDb2xvciA9ICcjRDlEOUQ5JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGxpa2VzQ291bnRbaW5kZXhdID49IDIpIGNoYW5nZUNvbG9yID0gJyNFNkU2RTYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYobGlrZXNDb3VudFtpbmRleF0gPj0gMSkgY2hhbmdlQ29sb3IgPSAnI0YyRjJGMic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBjaGFuZ2VDb2xvciA9ICcjRkZGJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2luZGV4fSBvbk1vdXNlVXA9e2hhbmRsZVRleHRTZWxlY3Rpb259IGNsYXNzTmFtZT1cInRleHQtYmxhY2tcIiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGNoYW5nZUNvbG9yLCB1c2VyU2VsZWN0OiAndGV4dCcgfX0+e2NoYXJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIClcbn0iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJpbml0aWFsaXplQXBwIiwiZ2V0RmlyZXN0b3JlIiwiY29sbGVjdGlvbiIsIm9yZGVyQnkiLCJ1cGRhdGVEb2MiLCJnZXREb2NzIiwiZG9jIiwicXVlcnkiLCJQb3N0cyIsInJvdXRlciIsInBvc3RMaXN0Iiwic2V0UG9zdExpc3QiLCJsaW5lSW5kZXgiLCJzZXRMaW5lSW5kZXgiLCJtZW51SG9tZU92ZXIiLCJzZXRNZW51SG9tZU92ZXIiLCJtZW51TXlPdmVyIiwic2V0TWVudU15T3ZlciIsInNlbGVjdGVkSWQiLCJzZXRTZWxlY3RlZElkIiwibWVudVNjcmFwT3ZlciIsInNldE1lbnVTY3JhcE92ZXIiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJkYXRhYmFzZVVSTCIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwiYXBwIiwiZGIiLCJnZXRDb250ZW50RnJvbURiIiwicSIsInRoZW4iLCJyZXMiLCJ0ZW1wIiwiZm9yRWFjaCIsImRvY1RlbXAiLCJkYXRhIiwicG9zdElkIiwiaWQiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsInVwbG9hZExpa2VzIiwibmV3TGlrZXMiLCJkb2N1bWVudFJlZiIsImxpa2VzIiwiaGFuZGxlVGV4dFNlbGVjdGlvbiIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsImZpbmRPYmoiLCJmaW5kIiwiaXRlbSIsInNlbGVjdGlvbiIsIndpbmRvdyIsImdldFNlbGVjdGlvbiIsInJhbmdlQ291bnQiLCJyYW5nZSIsImdldFJhbmdlQXQiLCJzZWxlY3RlZFRleHQiLCJ0b1N0cmluZyIsIm1zZyIsImluZGV4T2YiLCJsZW5ndGgiLCJ0ZXN0TGluZUJyZWFrcyIsImkiLCJsaW5lYnJlYWtzIiwibWF0Y2hlcyIsIm1hdGNoIiwidW5kZWZpbmVkIiwiY291bnQiLCJkaXYiLCJjbGFzc05hbWUiLCJwIiwic3R5bGUiLCJmb250RmFtaWx5IiwibWFwIiwiaW5kZXgiLCJ1bmVzY2FwZWRNc2ciLCJyZXBsYWNlIiwibGlrZXNDb3VudCIsInNwbGl0IiwidXNlciIsIm9uTW91c2VPdmVyIiwib25Nb3VzZUxlYXZlIiwib25DbGljayIsIndoaXRlU3BhY2UiLCJjaGFyIiwiY2hhbmdlQ29sb3IiLCJzcGFuIiwib25Nb3VzZVVwIiwiYmFja2dyb3VuZENvbG9yIiwidXNlclNlbGVjdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/posts/page.tsx\n"));

/***/ })

});