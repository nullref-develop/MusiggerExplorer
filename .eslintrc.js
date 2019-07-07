module.exports = {
    root: true,

    env: {
        node: true
    },

    parserOptions: {
        parser: "babel-eslint"
    },

    extends: ["eslint:recommended", "plugin:vue/recommended"],

    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "never"],
        "keyword-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],

        "array-bracket-spacing": ["error", "never"],
        "vue/array-bracket-spacing": ["error", "never"],
        "object-curly-spacing": ["error", "always"],
        "vue/object-curly-spacing": ["error", "always"],
        "block-spacing": ["error", "always"],
        "vue/block-spacing": ["error", "always"],
        "brace-style": ["error", "stroustrup"],
        "vue/brace-style": ["error", "stroustrup"],
        "comma-dangle": ["error", "never"],
        "vue/comma-dangle": ["error", "never"],
        eqeqeq: ["error", "smart"],
        "vue/eqeqeq": ["error", "smart"],
        "arrow-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],
        "vue/arrow-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],
        "key-spacing": [
            "error",
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        "vue/key-spacing": [
            "error",
            {
                beforeColon: false,
                afterColon: true
            }
        ],

        "vue/no-v-html": ["off", true],
        "vue/script-indent": ["error", 4],
        "vue/html-indent": [
            "error",
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        "vue/max-attributes-per-line": [
            "error",
            {
                singleline: 4,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        "vue/singleline-html-element-content-newline": [
            "error",
            {
                ignoreWhenNoAttributes: true,
                ignoreWhenEmpty: true,
                ignores: [
                    "p",
                    "span",
                    "small",
                    "a",
                    "label",
                    "h1",
                    "h2",
                    "h3",
                    "h4",
                    "h5",
                    "h6"
                ]
            }
        ]
    }
}
