import numpy as np
import json
from sklearn.metrics.pairwise import cosine_similarity

def compare(user, reference):
    if not user or not reference:
        return{'scores': [],
               'average': 0.0}
        
    similarity_scores = []
    
    for user_frame, ref_frame in zip(user, reference):
        user_points = user_frame.get('landmarks', [])
        ref_points = ref_frame.get('landmarks', [])
        frame_score = compare_frame(user_points, ref_points)
        similarity_scores.append(frame_score)
        
    avg = np.mean(similarity_scores) if similarity_scores else 0.0
    results = {
        'scores': similarity_scores,
        'average': round(avg, 4)
    }
    save(results)
    return results

def compare_frame(user_landmarks, reference_landmarks):
    scores = []
    min_length = min(len(user_landmarks), len(reference_landmarks))
    
    for i in range(min_length):
        compare = compare_points(user_landmarks[i], reference_landmarks[i])
        scores.append(compare)
        
    return np.mean(scores) if scores else 0.0

def compare_points(user_landmark, reference_landmark):
    user_vector = np.array([user_landmark['x'],
                            user_landmark['y'],
                            user_landmark['z']]).reshape(1, -1)
    reference_vector = np.array([reference_landmark['x'],
                                 reference_landmark['y'],
                                 reference_landmark['z']]).reshape(1, -1)
    
    if np.linalg.norm(user_vector) == 0 or np.linalg.norm(reference_vector) == 0:
        return 0.0
    
    return cosine_similarity(user_vector, reference_vector)[0][0]

def save(results, output = 'results/compare_results.json')    :
    try:
        with open(output, 'w') as f:
            json.dump(results, f, indent = 2)
    except Exception as e:
        print("Unable to save")