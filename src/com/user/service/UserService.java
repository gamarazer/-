package com.user.service;

import com.user.dao.UserDao;
import com.user.vo.User;
import com.util.MailUitls;
import com.util.UUIDUtils;

public class UserService {
	    // ע��UserDao
		private UserDao userDao;

		public void setUserDao(UserDao userDao) {
			this.userDao = userDao;
		}
		
		
		// ���û�����ѯ�û�
		public User findByUsername(String username){
			return userDao.findByUsername(username);
		}

		// ҵ�������û�ע��
		public void save(User user) {
			// �����ݴ��뵽���ݿ�
			user.setState(0); // 0:�����û�δ����.  1:�����û��Ѿ�����.
			String code = UUIDUtils.getUUID()+UUIDUtils.getUUID();
			user.setCode(code);
			userDao.save(user);
			// ���ͼ����ʼ�;
			System.out.println(22222+user.getUsername());
			System.out.println(33333+user.getPassword());
			System.out.println(111111+user.getEmail());
			MailUitls.sendMail(user.getEmail(), code);
		}

		// ҵ�����ݼ������ѯ�û�
		public User findByCode(String code) {
			return userDao.findByCode(code);
		}

		// �޸��û���״̬�ķ���
		public void update(User existUser) {
			userDao.update(existUser);
		}

		// �û���¼
		public User login(User user) {
			return userDao.login(user);
		}



		public User findByUid(Integer uid) {
			return userDao.findByUid(uid);
		}


		public void delete(User existUser) {
			userDao.delete(existUser);
		}
}
