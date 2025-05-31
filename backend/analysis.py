import mediapipe as mp
import numpy as np
import cv2

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

def draw_landmarks(image, detection):
    pose_landmarks_list = detection.pose_landmarks
    annotated_image = np.copy(image)
    
    mp_drawing.draw_landmarks(
        annotated_image,
        pose_landmarks_list,
        mp_pose.POSE_CONNECTIONS,
        landmark_drawing_spec = mp_drawing.DrawingSpec(color = (0, 255, 0), thickness = 2, circle_radius = 3),
        connection_drawing_spec=mp_drawing.DrawingSpec(color = (255, 0, 0), thickness = 2)
    )
        
    return annotated_image

def video_to_numpy(file_path):
    """
    Convert video to array of frames
    """
        
    video = cv2.VideoCapture(file_path)
    video_array = []
    
    while video.isOpened():
        ret, frame = video.read()
        if not ret:
            break
        video_array.append(frame)
        
    video.release()
    return np.array(video_array)

def analyze_json(video_data):
    """
    To analyze and get pose landmarks from video
    """
    
    file_path = 'temp/input.mp4'
    with open(file_path, 'wb') as f:
        f.write(video_data)
        
    mp_pose_inst = mp_pose.Pose(static_image_mode = False, min_detection_confidence = 0.5, model_complexity = 1)
    
    video_array = video_to_numpy(file_path)
    
    frames = []
    landmarks = []
    
    for frame in video_array:
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = mp_pose_inst.process(rgb_frame)
        
        if results.pose_landmarks:
            annotated_frame = draw_landmarks(rgb_frame, results)
            frames.append(annotated_frame)
            
            frame_landmarks = [(lm.x, lm.y, lm.z) for lm in results.pose_landmarks.landmark]
            landmarks.append(frame_landmarks)
        
    output = "temp/output.mp4"
    out = cv2.VideoWriter(
        output,
        cv2.VideoWriter_fourcc(*'mp4v'),
        30,
        (frames[0].shape[1], frames[0].shape[0])
    )
    
    for frame in frames:
        out.write(frame)
        
    out.release()
    
    return landmarks, output