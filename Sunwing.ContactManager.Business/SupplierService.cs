using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sunwing.ContactManager.DataAccess;
using Sunwing.ContactManager.DataModal.Models;

namespace Sunwing.ContactManager.Business
{
    public class SupplierService : ISupplierService
    {
        private IUnitOfWork unitOfWork;

        public SupplierService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Supplier> Get()
        {
            return unitOfWork.SupplierRepository.Get();
        }

        public Supplier GetById(int Id)
        {
            return unitOfWork.SupplierRepository.GetById(Id);
        }

        public Supplier Create(Supplier Supplier)
        {
            return unitOfWork.SupplierRepository.Insert(Supplier);
        }

        public void Delete(Supplier Supplier)
        {
            unitOfWork.SupplierRepository.Delete(Supplier);
        }

        public void Delete(int Id)
        {
            unitOfWork.SupplierRepository.Delete(Id);
        }

        public Supplier Update(Supplier Supplier)
        {
            return unitOfWork.SupplierRepository.Update(Supplier);
        }
    }
}
