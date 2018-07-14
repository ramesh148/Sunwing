﻿using Sunwing.ContactManager.DataModel;
using System;

namespace Sunwing.ContactManager.DataAccess
{
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        private ContactManagerEntities dbContext = new ContactManagerEntities();
        private ContactManagerRepository<Customer> customerRepository;
        private ContactManagerRepository<Supplier> supplierRepository;

        public ContactManagerRepository<Customer> CustomerRepository
        {
            get
            {
                if (this.customerRepository == null)
                {
                    this.customerRepository = new ContactManagerRepository<Customer>(dbContext);
                }
                return customerRepository;
            }
        }

        public ContactManagerRepository<Supplier> SupplierRepository
        {
            get
            {
                if (this.supplierRepository == null)
                {
                    this.supplierRepository = new ContactManagerRepository<Supplier>(dbContext);
                }
                return supplierRepository;
            }
        }

        public void Save()
        {
            dbContext.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if(!disposed)
            {
                if(disposing)
                {
                    dbContext.Dispose();
                }
            }

            this.disposed = true;
        }        
    }
}
