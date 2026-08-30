import json
import uuid
from datetime import datetime, timezone

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods


def _parse_json(request):
    if not request.body:
        return {}, None

    try:
        data = json.loads(request.body.decode('utf-8'))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return None, JsonResponse({'error': 'Request body must be valid JSON.'}, status=400)

    if not isinstance(data, dict):
        return None, JsonResponse({'error': 'JSON body must be an object.'}, status=400)

    return data, None


@require_http_methods(['GET'])
def index(request):
    return JsonResponse(
        {
            'service': 'reference-api',
            'operations': {
                'alpha': {'method': 'POST', 'path': '/api/alpha/'},
                'beta': {'method': 'GET', 'path': '/api/beta/'},
                'gamma': {'method': 'PUT', 'path': '/api/gamma/'},
                'delta': {'method': 'PATCH', 'path': '/api/delta/'},
            },
        }
    )


@csrf_exempt
@require_http_methods(['POST'])
def alpha(request):
    data, error = _parse_json(request)
    if error:
        return error

    try:
        x = float(data['x'])
        y = float(data['y'])
    except (KeyError, TypeError, ValueError):
        return JsonResponse({'error': 'alpha expects numeric fields: x and y.'}, status=400)

    return JsonResponse(
        {
            'operation': 'alpha',
            'inputs': {'x': x, 'y': y},
            'sum': x + y,
            'difference': x - y,
        }
    )


@require_http_methods(['GET'])
def beta(request):
    text = request.GET.get('text', '')
    mode = request.GET.get('mode', 'word')

    if not text:
        return JsonResponse({'error': 'beta expects query parameter: text.'}, status=400)

    if mode == 'char':
        tokens = list(text)
    else:
        mode = 'word'
        tokens = text.split()

    return JsonResponse(
        {
            'operation': 'beta',
            'text': text,
            'mode': mode,
            'tokens': tokens,
            'token_count': len(tokens),
        }
    )


@csrf_exempt
@require_http_methods(['PUT'])
def gamma(request):
    data, error = _parse_json(request)
    if error:
        return error

    values = data.get('values')
    include_average = bool(data.get('include_average', True))

    if not isinstance(values, list) or not values:
        return JsonResponse({'error': 'gamma expects a non-empty array field: values.'}, status=400)

    try:
        nums = [float(v) for v in values]
    except (TypeError, ValueError):
        return JsonResponse({'error': 'gamma values must all be numeric.'}, status=400)

    response = {
        'operation': 'gamma',
        'count': len(nums),
        'minimum': min(nums),
        'maximum': max(nums),
        'spread': max(nums) - min(nums),
    }

    if include_average:
        response['average'] = sum(nums) / len(nums)

    return JsonResponse(response)


@csrf_exempt
@require_http_methods(['PATCH'])
def delta(request):
    data, error = _parse_json(request)
    if error:
        return error

    enabled = data.get('enabled')
    tags = data.get('tags', [])

    if not isinstance(enabled, bool):
        return JsonResponse({'error': 'delta expects boolean field: enabled.'}, status=400)

    if not isinstance(tags, list) or any(not isinstance(tag, str) for tag in tags):
        return JsonResponse({'error': 'delta expects tags as an array of strings.'}, status=400)

    return JsonResponse(
        {
            'operation': 'delta',
            'reference_id': str(uuid.uuid4()),
            'enabled': enabled,
            'tag_count': len(tags),
            'tags': tags,
            'received_at': datetime.now(timezone.utc).isoformat(),
        }
    )
