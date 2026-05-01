import { useEffect, useRef, useState } from "react";
import { PoseLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

export default function WorkoutTracking() {

  let runningMode = "IMAGE";
  const [webCamRunning, setWebCamRunning] = useState(false);
  const poseLandmarker = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasCtx = useRef(null);
  const lastVideoTime = useRef(-1);
  
  useEffect(() => {
  const createPoseLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    poseLandmarker.current = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: "CPU"
      },
      runningMode: "VIDEO",
      numPoses: 4
    });
  };

  createPoseLandmarker();
  }, []);

  //Check webcam acxcess is supported
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

  //Enable webcaam and detection 
  const enableCamera = async () => {
        if (!poseLandmarker.current) {
          console.log("PoseLandmarker not loaded yet.");
          return;
        }

      const constraints = {video: true};

      //Activate webcam stream
      const video = videoRef.current
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        video.srcObject = stream;

        video.onloadeddata = () => {
          setWebCamRunning(true);
          predictWebcam();
        }
}

useEffect(() => {
    if (canvasRef.current) {
      canvasCtx.current = canvasRef.current.getContext("2d");
    }
  }, []); 

  //Pose estimation through webcam
  const predictWebcam = () => {
  const video = videoRef.current
  const canvas = canvasRef.current
  const ctx = canvasCtx.current

  //Match canvaas overlay with video
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  //Get current timestamp on frame
  const startTimeMs = performance.now();
  
  //Store video frame only if new
  if (lastVideoTime.current !== video.currentTime) {
    lastVideoTime.current = video.currentTime;

  //Run pose detection on current video frame
    poseLandmarker.current.detectForVideo(video, startTimeMs, (result) => {
      //Saves frames drawing state
      ctx.save();
      //Clears canvas on last frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const drawingUtils = new DrawingUtils(ctx)

      //Draws landmark spots and lines betweeen them
      for (const landmark of result.landmarks) {
        drawingUtils.drawLandmarks(landmark)
        
        drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
      }
      ctx.restore();
    });
  }
    requestAnimationFrame(predictWebcam)
}

return (
    <div>
      <h1>Workout Tracking</h1>
      <button onClick={enableCamera} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200">{webCamRunning ? "Running..." : "Start Exercise"}</button>
      <div className="absolute w-[640px] h-[480px]">
      <video ref={videoRef} autoPlay playsInline className="absolute top-0 left-0 w-full h-full object-cover"/>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10"></canvas>
      </div>
    </div>
  );
}

