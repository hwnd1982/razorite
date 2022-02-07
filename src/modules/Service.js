// 'https://private-anon-bacc14a64c-grchhtml.apiary-mock.com/slides';
// 'https://private-anon-20873e1819-grchhtml.apiary-mock.com/slides';
// 'https://polls.apiblueprint.org/slides';

export default class Service {
  static async getAll() {
    return await fetch(`https://private-anon-bacc14a64c-grchhtml.apiary-mock.com/slides`);
  }
  static async getSlides({ limit = 3, offset = 0 }) {
    return await fetch(`https://private-anon-bacc14a64c-grchhtml.apiary-mock.com/slides?offset=${offset}&limit=${limit}`);
  }
  static async setLike({ id = 0 }) {
    return await fetch(`https://private-anon-bacc14a64c-grchhtml.apiary-mock.com/slides/${id}/like`, {
      method: 'POST'
    });
  }
}
