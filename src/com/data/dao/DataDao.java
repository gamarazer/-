package com.data.dao;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import com.data.vo.Data;

public class DataDao extends HibernateDaoSupport{
	@SuppressWarnings("unchecked")
	public List<String> findByEquipmentId(Integer equipmentid) {
		String hql = "select data from Data where equipmentid = ?";
		List<String> list = this.getHibernateTemplate().find(hql, equipmentid);
		return list;
	}
	

	public void save(Data data) {
		this.getHibernateTemplate().save(data);
	}

	@SuppressWarnings("unchecked")
	public int findCount() {
		String hql = "select count(*) from Data";
		List<Long> list = this.getHibernateTemplate().find(hql);
		if (list != null && list.size() > 0) {
			return list.get(0).intValue();
		}
		return 0;
	}
	
	@SuppressWarnings("unchecked")
	public List<Data> findNew() {
		// ʹ������������ѯ:������session��
		
		DetachedCriteria criteria = DetachedCriteria.forClass(Data.class);
		// �����ڽ�����������:
		criteria.addOrder(Order.desc("dataid"));
		// ִ�в�ѯ:
		List<Data> list = this.getHibernateTemplate().findByCriteria(criteria, 0, 20);
		return list;
	}


	public void delete(Data data) {
		this.getHibernateTemplate().delete(data);
	}
}
