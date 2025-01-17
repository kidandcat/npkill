import * as getSize from 'get-folder-size';

import { LinuxFilesService } from '../src/services/linux-files.service';
import { StreamService } from '../src/services/stream.service';
jest.mock('get-folder-size');

const countDecimals = (numb: number): number => {
  if (Math.floor(numb.valueOf()) === numb.valueOf()) {
    return 0;
  }
  return numb.toString().split('.')[1].length || 0;
};

xdescribe('File Service', () => {
  let fileService;
  beforeEach(() => {
    fileService = new LinuxFilesService(new StreamService());
  });

  describe('#getFolderSize', () => {
    it('should call getSize function', () => {
      const folderSize = fileService.getFolderSize('');
      expect(getSize).toBeCalled();
    });
    it('should get max 2 decimals on the size', async () => {
      /*jest.mock('get-folder-size', () => getSize => 54674657);
      const folderSize = await fileService.getFolderSize('');
      expect(countDecimals(folderSize)).toBe(2);*/
    });
  });

  describe('#removeDir', () => {
    it('should throw error if try to delete an important directory ', () => {
      expect(() => fileService.removeDir('/')).toThrow();
    });
  });
});
