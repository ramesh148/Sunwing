using Sunwing.ContactManager.DataModal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sunwing.ContactManager.DataAccess
{
    public interface IUnitOfWork
    {
        ContactManagerRepository<Customer> CustomerRepository { get; }
        ContactManagerRepository<Supplier> SupplierRepository { get; }

        void Save();
    }
}
