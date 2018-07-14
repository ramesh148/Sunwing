using Sunwing.ContactManager.Business;
using Sunwing.ContactManager.DataAccess;
using Sunwing.ContactManager.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;
using Sunwing.ContactManager.WebApi.Filters;

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
        public IHttpActionResult Post(Customer customer)
        {
            var newCustomer = customerService.Create(customer);
            return Ok(customer);
        }

        [HttpGet]
        public IHttpActionResult GetAll ()
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

        //[HttpGet]
        //public IHttpActionResult Get(int Id)
        //{
        //    var customer = customerService.GetById(Id);
        //    if (customer == null)
        //    {
        //        var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
        //        {
        //            Content = new StringContent(string.Format("No customer available with Id = {0}", Id)),
        //            ReasonPhrase = "Customer not found."
        //        };

        //        throw new HttpResponseException(resp);
        //    }

        //    return Ok(customer);
        //}

        [HttpPut]
        public IHttpActionResult Put(Customer customer)
        {
            var newCustomer = customerService.Update(customer);
            return Ok(newCustomer);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int Id)
        {
            customerService.Delete(Id);
            return Ok("Success");
        }

        [HttpDelete]
        public IHttpActionResult Delete(Customer customer)
        {
            customerService.Delete(customer);
            return Ok();
        }
    }
}
