/**
 * 封装get、post等方法,并且获得登陆态，如果未登陆将自动跳转至登陆页面
 * 函数柯里化
 */
import userCenter from '../store/UserCenter';
import NavigationUtil from '../navigation/NavigationUtil';

const host = 'http://localhost:3000/api/v1/';

/**
 * 发送get请求  类似python里 requests.get
 * @param api 要请求的接口
 */
export function get(api: string) {
  return async (params?: {}) => {
    const token = await userCenter.getUserToken();
    // const {headers, url} = Constants;
    return handleData(
      fetch(buildParams(host + api, params), {
        headers: {
          'X-BLACKCAT-TOKEN': token || '',
        },
      }),
    );
  };
}

/**
 * 发送post请求
 * @param api 要请求的接口
 */
export function post(api: string) {
  /**
   * 第一个参数作为body参数，第二个参数作为URL path或者查询参数,第三个参数作为queryParams
   *
   */
  return (params: {}) => {
    return async (queryParams?: {} | string) => {
      const token = await userCenter.getUserToken();
      //   const {headers, url} = Constants;
      var data = params instanceof FormData ? params : JSON.stringify(params);
      return handleData(
        fetch(buildParams(host + api, queryParams), {
          method: 'POST',
          body: data,
          headers: {
            'content-type': 'application/json',
            'X-BLACKCAT-TOKEN': token || '',
          },
        }),
      );
    };
  };
}

/**
 * 处理接口返回数据
 * @param doAction
 */
function handleData(doAction: Promise<any>) {
  return new Promise((resolve, reject) => {
    doAction
      .then(res => {
        // 解析Content-type 防止将非json数据进行json转换
        const type = res.headers.get('Content-type');
        if ((type || '').indexOf('json') !== -1) {
          return res.json();
        }
        return res.text();
      })
      .then(result => {
        // console.log('handleData result~~~~:', JSON.stringify(result));
        console.log('handleData result~~~~:', 'gotResult');

        if (typeof result === 'string') {
          throw new Error(result);
        }
        if (result.error) {
          handleError(result.error);
        }
        if (result.statusCode === 403) {
          // TODO: 跳转到我们的登陆页面
          NavigationUtil.resetToLoginPage();
          return;
        }
        resolve(result);
      })
      .catch(e => {
        reject(e);
      });
  });
}

/**
 * 构建url参数
 * @param url
 * @param queryParams
 * @returns
 */
function buildParams(url: string, queryParams?: {} | string): string {
  let newUrl = new URL(url),
    finalUrl;
  //   debugger;
  if (typeof queryParams === 'object') {
    for (const [key, value] of Object.entries(queryParams)) {
      newUrl.searchParams.append(key, value as string);
    }
    finalUrl = newUrl.toString();
  } else if (typeof queryParams === 'string') {
    //  适配path参数
    finalUrl = url.endsWith('/') ? url + queryParams : url + '/' + queryParams;
  } else {
    finalUrl = newUrl.toString();
  }
  console.log('---buildPrams---', finalUrl);
  return finalUrl;
}

const handleError = (e: string) => {
  console.log('request handleError:', e);
};
