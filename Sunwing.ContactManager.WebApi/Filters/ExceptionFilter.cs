using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Net;

namespace Sunwing.ContactManager.WebApi.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {       
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is ApiExcetpion)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(context.Exception.Message),
                    ReasonPhrase = "Exception"
                });
            }

            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent("An error occured, please try again or contact administrator"),
                ReasonPhrase = "Critical Error"
            });
        }

        public override Task OnExceptionAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            return base.OnExceptionAsync(actionExecutedContext, cancellationToken);
        }
    }

    public class ApiExcetpion : Exception
    {
        public int FaultCode { get; private set; }

        public ApiExcetpion(int faultCode, string message) : base(message)
        {
            this.FaultCode = faultCode;
        }

    }
}