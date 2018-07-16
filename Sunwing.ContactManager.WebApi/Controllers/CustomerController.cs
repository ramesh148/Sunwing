using Sunwing.ContactManager.Business;
using Sunwing.ContactManager.DataModel;
using System.Net;
using System.Web.Http;
using System.Web.Http.Filters;
using Sunwing.ContactManager.WebApi.Filters;
using System.Net.Http;

namespace Sunwing.ContactManager.WebApi.Controllers
{
    [ExceptionFilter]
    [LogActionFilter]
    public class CustomerController : ApiController
    {
        ICustomerService customerService;

        public CustomerController(ICustomerService customerService)
        {
            this.customerService = customerService;
        }

        [HttpPost]        
        public IHttpActionResult PostCustomer(Customer customer)
        {
            var newCustomer = customerService.Create(customer);
            return Ok(customer);
        }
        
        [HttpGet]
        public IHttpActionResult GetCustomers ()
        {
            var customers = customerService.Get();
            if (customers == null)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Customers not available"),
                    ReasonPhrase = "Customers not found."
                };

                throw new HttpResponseException(resp);
            }

            return Ok(customers);
        }

        [HttpGet]
        public IHttpActionResult GetCustomer(int Id)
        {
            var customer = customerService.GetById(Id);
            if (customer == null)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No customer available with Id = {0}", Id)),
                    ReasonPhrase = "Customer not found."
                };
                throw new HttpResponseException(resp);
            }
            return Ok(customer);
        }

        [HttpPut]
        public IHttpActionResult PutCustomer(Customer customer)
        {
            var newCustomer = customerService.Update(customer);
            return Ok(newCustomer);
        }

        [HttpDelete]
        public IHttpActionResult DeleteCustomer(int Id)
        {
            customerService.Delete(Id);
            return Ok("Success");
        }

        [HttpDelete]
        public IHttpActionResult DeleteCustomer(Customer customer)
        {
            customerService.Delete(customer);
            return Ok();
        }
    }
}
