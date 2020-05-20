export default (type = 'default', size) => {
  const defaultParams = s => {
    let w = 0,
      h = 0
    if (s === '720p') {
      w = 1280
      h = 720
    } else if (s === '1080p') {
      w = 1920
      h = 1080
    }
    return {
      paraArray: [
        {
          w: w,
          wDuration: 0,
          h: h,
          hDuration: 0,
          x: 0,
          xDuration: 0,
          y: 0,
          yDuration: 0,
          v: 100,
          vDuration: 0,
          z: 0,
          a: 0,
          aDuration: 0,
          aType: 0
        },
        {
          w: w,
          wDuration: 0,
          h: h,
          hDuration: 0,
          x: w,
          xDuration: 0,
          y: 0,
          yDuration: 0,
          v: 0,
          vDuration: 0,
          z: 1,
          a: 0,
          aDuration: 0,
          aType: 0
        },
        {
          w: w,
          wDuration: 0,
          h: h,
          hDuration: 0,
          x: w,
          xDuration: 0,
          y: 0,
          yDuration: 0,
          v: 0,
          vDuration: 0,
          z: 2,
          a: 0,
          aDuration: 0,
          aType: 0
        },
        {
          w: w,
          wDuration: 0,
          h: h,
          hDuration: 0,
          x: w,
          xDuration: 0,
          y: 0,
          yDuration: 0,
          v: 0,
          vDuration: 0,
          z: 2,
          a: 0,
          aDuration: 0,
          aType: 0
        }
      ],
      directToPGM: true
    }
  }
  const gasketParams = s => {
    let w = 0,
      h = 0
    if (s === '720p') {
      w = 1280
      h = 720
    } else if (s === '1080p') {
      w = 1920
      h = 1080
    }
    return {
      paraArray: [
        {
          w: w,
          wDuration: 0,
          h: h,
          hDuration: 0,
          x: w,
          xDuration: 0,
          y: 0,
          yDuration: 0,
          v: 0,
          vDuration: 0,
          z: 0,
          a: 0,
          aDuration: 0,
          aType: 0
        },
        {
          w: w,
          wDuration: 0,
          h: h,
          hDuration: 0,
          x: w,
          xDuration: 0,
          y: 0,
          yDuration: 0,
          v: 0,
          vDuration: 0,
          z: 1,
          a: 0,
          aDuration: 0,
          aType: 0
        },
        {
          w: w,
          wDuration: 0,
          h: h,
          hDuration: 0,
          x: 0,
          xDuration: 0,
          y: 0,
          yDuration: 0,
          v: 100,
          vDuration: 0,
          z: 2,
          a: 0,
          aDuration: 0,
          aType: 0
        },
        {
          w: w,
          wDuration: 0,
          h: h,
          hDuration: 0,
          x: w,
          xDuration: 0,
          y: 0,
          yDuration: 0,
          v: 0,
          vDuration: 0,
          z: 2,
          a: 0,
          aDuration: 0,
          aType: 0
        }
      ],
      directToPGM: true
    }
  }
  return type === 'gasket' ? gasketParams(size) : defaultParams(size)
}
