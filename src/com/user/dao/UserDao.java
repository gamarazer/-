package com.user.dao;

import java.util.List;

import com.user.vo.User;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public class UserDao extends HibernateDaoSupport{
	    // �����ֲ�ѯ
		@SuppressWarnings("unchecked")
		public User findByUsername(String username) {
			String hql = "from User where username = ?";
			List<User> list = this.getHibernateTemplate().find(hql, username);
			if (list != null && list.size() > 0) {
				return list.get(0);
			}
			return null;
		}

		// ע���û��������ݿ����
		public void save(User user) {
			this.getHibernateTemplate().save(user);
		}

		// ���ݼ������ѯ�û�
		@SuppressWarnings("unchecked")
		public User findByCode(String code) {
			String hql = "from User where code = ?";
			List<User> list = this.getHibernateTemplate().find(hql, code);
			if (list != null && list.size() > 0) {
				return list.get(0);
			}
			return null;
		}

		// �޸��û�״̬�ķ���
		public void update(User existUser) {
			this.getHibernateTemplate().update(existUser);
		}

		// �û���¼
		@SuppressWarnings("unchecked")
		public User login(User user) {
			String hql = "from User where username = ? and password = ? and state = ?";
			List<User> list = this.getHibernateTemplate().find(hql,
					user.getUsername(), user.getPassword(), 1);
			if (list != null && list.size() > 0) {
				return list.get(0);
			}
			return null;
		}

		@SuppressWarnings("unchecked")
		public int findCount() {
			String hql = "select count(*) from User";
			List<Long> list = this.getHibernateTemplate().find(hql);
			if (list != null && list.size() > 0) {
				return list.get(0).intValue();
			}
			return 0;
		}

//		public List<User> findByPage(int begin, int limit) {
//			String hql = "from User";
//			List<User> list = this.getHibernateTemplate().execute(
//					new PageHibernateCallback<User>(hql, null, begin, limit));
//			return list;
//		}

		public User findByUid(Integer uid) {
			return this.getHibernateTemplate().get(User.class, uid);
		}

		public void delete(User existUser) {
			this.getHibernateTemplate().delete(existUser);
		}
}
