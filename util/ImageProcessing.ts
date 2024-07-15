import ImageResizer from 'react-native-image-resizer';
import { Image } from 'react-native';

export const compressImage = (uri: string): Promise<string> => {
  console.log(ImageResizer)
  console.log(Image)
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      async (width, height) => {
        try {
          const quality = 5;
          console.log(ImageResizer)
          const response = await ImageResizer.createResizedImage(
            uri,
            width, 
            height, 
            'JPEG',
            quality
          );

          resolve(response.uri);
        } catch (error) {
          console.error('Error compressing image:', error);
          reject(error);
        }
      },
      (error) => {
        console.error('Failed to get image size:', error);
        reject(error);
      }
    );
  });
};