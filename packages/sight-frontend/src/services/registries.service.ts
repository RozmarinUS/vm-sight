import request from '@/utils/request';

class RegistriesService {
  getRegistries () {
    return request.get('/registries');
  }
}

export default new RegistriesService();
