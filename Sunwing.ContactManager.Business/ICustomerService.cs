using Sunwing.ContactManager.DataModal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sunwing.ContactManager.Business
{
    public interface ICustomerService
    {
        Customer Create(Customer customer);
        void Delete(Customer customer);
        void Delete(int Id);
        IEnumerable<Customer> Get();
        Customer GetById(int Id);
        Customer Update(Customer customer);
    }
}
