from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from analysis import analyze_json
from compare import compare

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/test')
def test():
    return {'message: test, server is running'}

@app.get('/upload')
async def upload_video(file: UploadFile = File(...)):
    if not file.filename.endwith('.mp4'):
        raise HTTPException(status_code = 400, detail = "Only MP4 Videos are allowed")
    
    video_data = await file.read()
    video_id = str(uuid4())
    
    landmarks, landmark_file_path = analyze_json(video_data)
    if not landmarks:
        raise HTTPException(status_code = 400, detail = "Pose estimation failed")
    
    ref_landmarks = compare.load_reference_landmarks()
    if not ref_landmarks:
        raise HTTPException(status_code = 400, detail = "Reference landmarks not found")
    
    similar_score = compare(landmarks, ref_landmarks)
    
    return JSONResponse(content = {
        'video_id': video_id,
        'similarity_scores': similasimilar_score,
        'landmark_file_path': landmark_file_path
    })
    
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host = '127.0.0.1', port = 5000)