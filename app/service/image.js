const { setCtxBody } = require('../utils')
const { runCommand } = require('../utils/shell')

class ImageService {
    // 镜像列表
    async getImages (ctx) {
        try {
            const result = await runCommand('docker images')
            const ImageList = ImageService.getImagesFunc(result)
            return setCtxBody(200, ImageList)
        } catch (error) {
            return setCtxBody(500, error, '系统错误')
        }
    }

    // 处理容器的数据
    static getImagesFunc (result) {
        const list = result.split('\n')
        list.shift()
        list.pop()
        
        let ImageList = []
        for (let i of list) {
            let arr = i.split('  ').filter(item => !!item).filter(item => !item.includes('->'))
            ImageList.push({
                REPOSITORY: arr[0],
                TAG: arr[1],
                IMAGEID: arr[2],
                CREATED: arr[3],
                SIZE: arr[4]
            })
        }
        return ImageList
    }
}

module.exports = new ImageService()
