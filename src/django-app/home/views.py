import logging
from django.shortcuts import render

logger = logging.getLogger(__name__)

# Create your views here.
def index(request):
    logger.info("Rendering the index page")
    logger.debug(f"Request method: {request.method}, Request path: {request.path}")
    logger.warning("This is a warning message for demonstration purposes")
    logger.error("This is an error message for demonstration purposes")
    return render(request, 'home/index.html')