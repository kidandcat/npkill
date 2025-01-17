import { UpdateService } from '../src/services/update.service';
import { HttpsService } from '../src/services/https.service';

describe('update Service', () => {
  let updateService: UpdateService;
  let httpsService: HttpsService;

  beforeEach(() => {
    httpsService = new HttpsService();
    updateService = new UpdateService(httpsService);
  });

  describe('#isUpdated', () => {
    const localVersion = '2.3.6';
    const cases = [
      {
        isUpdated: true,
        remoteVersion: '2.3.6',
      },
      {
        isUpdated: true,
        remoteVersion: '0.3.6',
      },
      {
        isUpdated: true,
        remoteVersion: '0.2.1',
      },
      {
        isUpdated: true,
        remoteVersion: '2.2.1',
      },
      {
        isUpdated: true,
        remoteVersion: '2.3.5',
      },
      {
        isUpdated: true,
        remoteVersion: '0.2.53',
      },
      {
        isUpdated: true,
        remoteVersion: '0.2.53',
      },
      {
        isUpdated: false,
        remoteVersion: '2.3.61',
      },
      {
        isUpdated: false,
        remoteVersion: '2.3.7',
      },
      {
        isUpdated: false,
        remoteVersion: '4.74.452',
      },
    ];

    cases.forEach(cas => {
      it(`should check the local version ${localVersion} is up to date with the remote ${cas.remoteVersion}`, done => {
        const mockResponse = `{"last-recomended-version": "${cas.remoteVersion}"}`;
        httpsService.get = jest
          .fn()
          .mockImplementation(() => Promise.resolve(JSON.parse(mockResponse)));

        updateService.isUpdated(localVersion).then(isUpdated => {
          expect(isUpdated).toBe(cas.isUpdated);
          done();
        });
      });
    });
  });
});
