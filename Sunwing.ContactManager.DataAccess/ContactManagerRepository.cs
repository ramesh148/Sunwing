using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Data.Entity;
using Sunwing.ContactManager.DataModal.Models;

namespace Sunwing.ContactManager.DataAccess
{
    public class ContactManagerRepository<TEntity> : IContactManagerRepository<TEntity>
    where TEntity : class
    {
        internal ContactManagerContext dbContext;
        internal DbSet<TEntity> dbSet;

        public ContactManagerRepository(ContactManagerContext dbContext)
        {
            this.dbContext = dbContext;
            this.dbSet = dbContext.Set<TEntity>();
        }

        public virtual IEnumerable<TEntity> Get()
        {
            return dbSet.ToList();
        }

        public virtual TEntity GetById(object Id)
        {
            return dbSet.Find(Id);
        }

        public virtual void Delete(object Id)
        {
            TEntity entityToDelete = dbSet.Find(Id);
            Update(entityToDelete);  //soft delete, set IsActive = 0
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            Update(entityToDelete); //soft delete, set IsActive = 0
        }        

        public virtual TEntity Insert(TEntity entity)
        {
            return dbSet.Add(entity);
        }

        public virtual TEntity Update(TEntity entityToUpdate)
        {
            var entity = dbSet.Attach(entityToUpdate);
            dbContext.Entry(entityToUpdate).State = EntityState.Modified;

            return entity;
        }
    }
}
