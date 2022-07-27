import request from '@/utils/request-code.js'

let qs = require("qs");
let data = qs.stringify({
  code: "import java.util.Scanner;\npublic class MatSym {\n    public static void main(String[]args) {\n       Scanner in = new Scanner(System.in);\nSystem.out.println(in.nextLine());\nSystem.out.println(in.nextLine());\n    }\n}",
  language: "java",
  input: "Hello\nWorld",
});


// execute code
export function execute(body) {
  return request({
    url: '/',
    method: 'post',
    data: qs.stringify({
      code: body,
      language: "java",
      input: "Hello\nWorld",
    })
  })
}