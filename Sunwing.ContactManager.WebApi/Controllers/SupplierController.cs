using Sunwing.ContactManager.Business;
using Sunwing.ContactManager.DataModel;
using Sunwing.ContactManager.WebApi.Filters;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace Sunwing.ContactManager.WebApi.Controllers
{
    [ExceptionFilter]
    [LogActionFilter]
    public class SupplierController : ApiController
    {
        ISupplierService SupplierService;

        public SupplierController(ISupplierService SupplierService)
        {
            this.SupplierService = SupplierService;
        }

        [HttpPost]
        public IHttpActionResult PostSupplier(Supplier Supplier)
        {
            var newSupplier = SupplierService.Create(Supplier);
            return Ok(Supplier);
        }

        [HttpGet]
        public IHttpActionResult GetSuppliers()
        {
            var Suppliers = SupplierService.Get();
            if (Suppliers == null)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Suppliers not available"),
                    ReasonPhrase = "Suppliers not found."
                };

                throw new HttpResponseException(resp);
            }

            return Ok(Suppliers);
        }

        [HttpGet]
        public IHttpActionResult GetSupplier(int Id)
        {
            var Supplier = SupplierService.GetById(Id);
            if (Supplier == null)
            {
                var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No Supplier available with Id = {0}", Id)),
                    ReasonPhrase = "Supplier not found."
                };

                throw new HttpResponseException(resp);
            }

            return Ok(Supplier);
        }

        [HttpPut]
        public IHttpActionResult PutSupplier(Supplier Supplier)
        {
            var newSupplier = SupplierService.Update(Supplier);
            return Ok(newSupplier);
        }

        [HttpDelete]
        public IHttpActionResult DeleteSupplier(int Id)
        {
            SupplierService.Delete(Id);
            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteSupplier(Supplier Supplier)
        {
            SupplierService.Delete(Supplier);
            return Ok();
        }
    }
}


