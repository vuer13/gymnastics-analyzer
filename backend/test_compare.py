import pytest
from compare import compare

user = [
    {
        'frame_num': 0,
        'landmarks': [
            {'x': 1, 'y': 0, 'z': 0},
            {'x': 0, 'y': 1, 'z': 0}
        ]
    }
]

ref1 = [
    {
        'frame_num': 0,
        'landmarks': [
            {'x': 1, 'y': 0, 'z': 0},
            {'x': 0, 'y': 1, 'z': 0}
        ]
    }
]

ref2 = [
    {
        'frame_num': 0,
        'landmarks': [
            {'x': 1, 'y': 0, 'z': 0},
            {'x': -1, 'y': -1, 'z': 0}
        ]
    }
]

def test_perfect():
    result = compare(user, ref1)
    assert result['average'] == pytest.approx(1.0, abs = 1e-6)
    assert all(score == pytest.approx(1.0, abs = 1e-6) for score in result["scores"])
    
def test_partial_similarity():
    result = compare(user, ref2)
    print(result["average"])
    assert 0.0 < result["average"] < 0.5
    
def test_empty_input():
    result = compare([], [])
    assert result["average"] == 0.0
    assert result["scores"] == []