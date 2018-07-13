using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sunwing.ContactManager.DataAccess;
using Sunwing.ContactManager.DataModal.Models;

namespace Sunwing.ContactManager.Business
{
    public class CustomerService : ICustomerService
    {
        private IUnitOfWork unitOfWork;
        
        public CustomerService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Customer> Get()
        {
            return unitOfWork.CustomerRepository.Get();
        }

        public Customer GetById(int Id)
        {
            return unitOfWork.CustomerRepository.GetById(Id);
        }

        public Customer Create(Customer customer)
        {
            return unitOfWork.CustomerRepository.Insert(customer);
        }

        public void Delete(Customer customer)
        {
            customer.IsActive = false;
            unitOfWork.CustomerRepository.Delete(customer);
        }

        public void Delete(int Id)
        {
           var customer = unitOfWork.CustomerRepository.GetById(Id);            
            unitOfWork.CustomerRepository.Delete(customer);
        }        

        public Customer Update(Customer customer)
        {
            return unitOfWork.CustomerRepository.Update(customer);
        }
    }
}
