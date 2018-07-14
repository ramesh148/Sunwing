using Sunwing.ContactManager.DataAccess;
using Sunwing.ContactManager.DataModel;
using System.Collections.Generic;

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
            var newCustomer = unitOfWork.CustomerRepository.Insert(customer);
            unitOfWork.Save();
            return newCustomer;
        }

        public void Delete(Customer customer)
        {
            customer.IsActive = false;
            unitOfWork.CustomerRepository.Delete(customer);
            unitOfWork.Save();
        }

        public void Delete(int Id)
        {
           var customer = unitOfWork.CustomerRepository.GetById(Id);            
            unitOfWork.CustomerRepository.Delete(customer);
            unitOfWork.Save();
        }        

        public Customer Update(Customer customer)
        {
            var newCustomer = unitOfWork.CustomerRepository.Update(customer);
            unitOfWork.Save();
            return newCustomer;
        }
    }
}
