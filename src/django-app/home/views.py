from django.shortcuts import render

# import logging
# logger = logging.getLogger(__name__)

# Create your views here.
def index(request):
    # logger.info("Rendering the index page")
    # logger.debug(f"Request method: {request.method}, Request path: {request.path}")
    # logger.warning("This is a warning message for demonstration purposes")
    # logger.error("This is an error message for demonstration purposes")
    # logger.warning("WARNING: Warning log with properties", extra={"key1": "value1"})
    # logger.warning(
    #     "Hello World!",
    #     extra={
    #         "microsoft.custom_event.name": "test-event-name",
    #         "additional_attrs": "val1"
    #     }
    # )
    # logger.info(
    #     "This entry will have a custom client_IP",
    #     extra={
    #         "microsoft.custom_event.name": "test_event",
    #         "client.address": "192.168.1.1"
    #     }
    # )
    return render(request, 'home/index.html')