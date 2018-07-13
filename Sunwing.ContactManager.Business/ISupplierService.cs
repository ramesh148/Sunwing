using Sunwing.ContactManager.DataModal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sunwing.ContactManager.Business
{
    public interface ISupplierService
    {
        Supplier Create(Supplier supplier);
        void Delete(Supplier supplier);
        void Delete(int Id);
        IEnumerable<Supplier> Get();
        Supplier GetById(int Id);
        Supplier Update(Supplier supplier);
    }
}
