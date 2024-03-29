/**
 * 模拟promise
 */
const PEDDING: string = "pedding"; // promise初始状态 pedding
const FULFILLED: string = "fullfilled"; // promise成功状态 fullfilled
const REJECTED: string = "rejected"; // promise失败状态 fullfilled

class MyPromise {
// then(arg0: (res: string) => void) {
//   throw new Error("Method not implemented.");
// }
    private status: string;
    private value: string | undefined;
    private reson: string | undefined;
    private onFulfilledCallbacks: Function[] = [];
    private onRejectedCallbacks: Function[] = [];
    constructor(executor: any) {
        this.status = PEDDING;
        this.value = undefined; // 成功返回的值
        this.reson = undefined; // 失败原因

        let resolve = (value: string | undefined) =>  {
            if(this.status == PEDDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn(this.value));
            }
        }
        let reject = (reson: string | undefined) => {
            if(this.status == PEDDING) {
                this.status = REJECTED;
                this.reson = reson;
                this.onRejectedCallbacks.forEach(fn => fn(this.reson))
            }
        }

        try {
            executor(resolve, reject);
        } catch(error: any) {
            reject(error)
        }
        
    }
}

export default MyPromise;
