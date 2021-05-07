import {dispatch, Observable} from "../adorable"

export const urlencoded = (object:Record<string, string>) => Object.keys(object).map(key => `${key}=${encodeURIComponent(object[key])}`).join("&")

interface RequestInitEx extends RequestInit {
  host?:string
  url?:string
  response?:(res:Response) => any
  preScript?:Function
  onBeforeSend?:Function
  mock?:any
}

class HttpService {
  private readonly init:RequestInitEx

  constructor(init = {}, http?:HttpService) {
    this.init = http ? {...http.init, ...init} : {...init}
  }

  /// Request
  request(data:RequestInitEx) { return new HttpService(data, this) }

  host(host:string) { return this.request({host}) }

  url(url:string) { return this.request({url}) }

  headers(headers:HeadersInit) { return this.request({headers}) }

  header(key:string, value:string) { return this.request({headers: {...this.init.headers, [key]: value}}) }

  mode(mode:RequestMode) { return this.request({mode}) }

  body(body:any) { return this.request({body}) }

  credentials(credentials:RequestCredentials) { return this.request({credentials}) }

  preScript(preScript:Function) {return this.request({preScript}) }

  onBeforeSend(onBeforeSend:Function) {return this.request({onBeforeSend}) }


  /// Request - methods
  method(method:string, ...url:string[]) { return this.request({method, url: url.join("/")}) }

  GET(...url:string[]) { return this.method("GET", ...url) }

  POST(...url:string[]) { return this.method("POST", ...url) }

  PUT(...url:string[]) { return this.method("PUT", ...url) }

  DELETE(...url:string[]) { return this.method("DELETE", ...url) }

  PATCH(...url:string[]) { return this.method("PATCH", ...url) }

  HEAD(...url:string[]) { return this.method("HEAD", ...url) }

  OPTIONS(...url:string[]) { return this.method("OPTIONS", ...url) }

  /// Response
  response(response:(res:Response) => any) { return this.request({response}) }


  /// Request -> Response
  send<T>(body = {}) {
    const _body = body

    let init = this.init
    let url = (this.init.host || "") + this.init.url

    /// @FIXME:
    if (init.method === "GET" || init.method === "DELETE" || init.method === "HEAD") {
      init = {...this.init}

      url += "?" + Object.entries(body)
        .filter(([key, value]) => value !== undefined && value !== null)
        // @ts-ignore
        .map(([key, value]) => encodeURIComponent(key) + "=" + encodeURIComponent(value)).join("&")

      delete init.body
    }
    else if (body) {
      body = init.body ? init.body(body) : body
      init = {...this.init, body}
    }

    // if (typeof init.preScript === "function") {
    // 	init = {...init, ...init.preScript(init)};
    // }

    const response = init.response || ((res:Response) => res.text())
    const mock = init.mock
    const method = init.method

    return new Observable<T>(observer => {

      if (init.onBeforeSend) {
        init.onBeforeSend(init)
      }

      /// @FIXME: MOCK UP / SUCCESS / FAILURE 분기 처리
      let ok = true
      const request = mock ? Observable.of(mock[method + " " + url]).delay(250)
        : fetch(url, init)
          .then(res => {
            ok = res.ok
            return res
          })
          .then(response)
          .then(res => {
            if (!ok) throw res
            return res
          })

      return Observable.castAsync<T>(request)
        .initialize(() => dispatch(init.method + " " + init.url + ".REQUEST", _body))
        .tap(
          res => dispatch(init.method + " " + init.url + ".SUCCESS", res),
          err => dispatch(init.method + " " + init.url + ".FAILURE", err)
        )
        .subscribe(observer)
    })
  }

  useMock(mock:any) { return this.request({mock}) }
}


export const http$ = new HttpService()