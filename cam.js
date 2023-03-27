let gif, detector, video

async function addVideo() {
    const video = document.createElement('video')
    video.setAttribute('autoplay', '')
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    document.body.appendChild(video)
    const stream = await navigator.mediaDevices.getUserMedia({video: true})
    video.srcObject = stream    
    return video
}

async function setupModel () {
    const model = poseDetection.SupportedModels.BlazePose
    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'
    }
    const detector = await poseDetection.createDetector(model, detectorConfig)
    return detector
}

async function draw () {
	const poses = await detector.estimatePoses(video)
    if (poses.length > 0) { 
      const leftEye = poses[0].keypoints[5]
      gif.style.left = leftEye.x - gif.width / 2.5 + 'px'
      gif.style.top = leftEye.y - gif.height / 2.5 + 'px'

      const rightEye = poses[0].keypoints[2]
      gif2.style.left = rightEye.x - gif2.width / 2.5 + 10 + 'px'
      gif2.style.top = rightEye.y - gif2.height / 2.5 + 'px'

      const nose = poses[0].keypoints[0] 
      gif3.style.left = nose.x - gif3.width / 2 + 10 + 'px'
      gif3.style.top = nose.y - gif3.height / 2 + 'px'

      const face = document.querySelector('.face')
      face.style.left = nose.x - 60 + 'px'
      face.style.top = nose.y + - 100 + 'px'

      const leftCheek = poses[0].keypoints[8]
      gif4.style.left = leftCheek.x - 20 + 'px'
      gif4.style.top = leftCheek.y + 'px'

      const rightCheek = poses[0].keypoints[7]
      gif5.style.left = rightCheek.x - 20 + 'px'
      gif5.style.top = rightCheek.y + 'px'

      const mouth = poses[0].keypoints[9] 
      gif1.style.left = mouth.x - gif1.width / 2 - 15 + 'px'
      gif1.style.top = mouth.y - gif1.height / 2 + 20 + 'px'
    }
    requestAnimationFrame(draw)
}

async function setup () {
    gif = document.createElement('img')
    gif.src = 'eye.png'
    gif.style.position = 'absolute'
    document.body.appendChild(gif)
    gif.style.height = '60px'

    gif1 = document.createElement('img')
    gif1.src = 'mouth.png'
    gif1.style.position = 'absolute'
    document.body.appendChild(gif1)
    gif1.style.height = '100px'

    gif2 = document.createElement('img')
    gif2.src = 'eye.png'
    gif2.style.position = 'absolute'
    document.body.appendChild(gif2)
    gif2.style.height = '60px'

    gif3 = document.createElement('img')
    gif3.src = 'nose.png'
    gif3.style.position = 'absolute'
    gif3.id = 'nose'
    document.body.appendChild(gif3)
    gif3.style.height = '50px'


    gif4 = document.createElement('img')
    gif4.src = 'flowers.gif'
    gif4.style.position = 'absolute'
    document.body.appendChild(gif4)
    gif4.style.height = '70px'

    gif5 = document.createElement('img')
    gif5.src = 'flowers.gif'
    gif5.style.position = 'absolute'
    document.body.appendChild(gif5)
    gif5.style.height = '70px'

    gif6 = document.createElement('img')
    gif6.src = 'star.gif'
    gif6.style.position = 'absolute'
    document.body.appendChild(gif6)
    gif6.style.height = '70px' 

    gif7 = document.createElement('img')
    gif7.src = 'star.gif'
    gif7.style.position = 'absolute'
    document.body.appendChild(gif7)
    gif7.style.height = '70px'

    video = await addVideo()
  	detector = await setupModel()
    console.log('detector ready', detector)
  
    setTimeout(draw, 1000) 
}

window.addEventListener('load', setup)