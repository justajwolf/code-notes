export class RoomContainerRegistry extends Map<string, any> {
  get(k: any) {
    return super.get(`${k}`);
  }
  set(k: any, v: any) {
    return super.set(`${k}`, v);
  }
  delete(k: any) {
    return super.delete(`${k}`);
  }
}

const a = new RoomContainerRegistry();
a.set(1, '20');
a.set(2, '50');
console.log([...a.keys()], a.get(1), a.get(2));
console.log(a.delete(1), [...a.keys()])