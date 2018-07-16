using Sunwing.ContactManager.DataModel;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Sunwing.ContactManager.DataAccess
{
    public class ContactManagerRepository<TEntity> : IContactManagerRepository<TEntity>
    where TEntity : class
    {
        internal ContactManagerEntities dbContext;
        internal DbSet<TEntity> dbSet;

        public ContactManagerRepository(ContactManagerEntities dbContext)
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
            dbContext.Entry(entityToDelete).State = EntityState.Deleted;
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            dbContext.Entry(entityToDelete).State = EntityState.Deleted;
        }        

        public virtual TEntity Insert(TEntity entity)
        {
            return dbSet.Add(entity);
        }

        public virtual TEntity Update(TEntity entityToUpdate)
        {
            var entity = dbSet.Attach(entityToUpdate);
            dbContext.Entry(entityToUpdate).State = EntityState.Modified;
            return entityToUpdate;
        }
    }
}
