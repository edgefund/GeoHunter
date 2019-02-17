import img1 from './daniel-olah-780287-unsplash.jpg'
import img2 from './autumn-studio-463253-unsplash.jpg'
import img3 from './bharath-g-s-388435-unsplash.jpg'
import img4 from './joel-filipe-195321-unsplash.jpg'
import img5 from './laura-vinck-427554-unsplash.jpg'

export const imgArray = [img1, img2, img3, img4, img5]

export function loadImg(imgIndex) {
  if(imgIndex >= imgArray.length || imgIndex < 0) {
    return imgArray[imgArray.length-1]
  }
  return imgArray[imgIndex]
}